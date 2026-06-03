#!/usr/bin/env bash
set -euo pipefail

die() {
  echo "install fst: $*" >&2
  exit 1
}

info() {
  echo "install fst: $*"
}

usage() {
  cat <<'EOF'
Install the latest FST Linux package from GitHub Releases.

Usage:
  curl -fsSL https://www.fernsehturm.dev/install.sh | bash

Environment:
  FST_GITHUB_REPO           GitHub repo; default fernsehturm/fernsehturm
  FST_INSTALL_VERSION       release tag to install instead of latest
  FST_RELEASE_BASE          full release download base URL override
  FST_INSTALL_ASSET         package asset name override
  FST_CHECKSUM_ASSET        checksum asset name override; default checksums.txt
  FST_INSTALL_BIN_DIR       target command directory; default $HOME/.local/bin
  FST_INSTALL_DATA_DIR      target asset directory; default $XDG_DATA_HOME/fst or $HOME/.local/share/fst
  FST_INSTALL_FORCE         set to 0 to refuse overwriting an existing install; default 1
  FST_INSTALL_UPDATE_SHELL  set to 0 to avoid adding the bin directory to a shell profile
  FST_INSTALL_SKIP_CHECKSUM set to 1 to skip checksum verification
EOF
}

if [[ "${1:-}" == "--help" || "${1:-}" == "-h" ]]; then
  usage
  exit 0
fi

need_command() {
  local name="$1"
  command -v "$name" >/dev/null 2>&1 || die "required command not found: $name"
}

download() {
  local url="$1"
  local target="$2"

  if command -v curl >/dev/null 2>&1; then
    curl -fsSL --retry 3 --connect-timeout 10 -o "$target" "$url"
    return
  fi

  if command -v wget >/dev/null 2>&1; then
    wget -q -O "$target" "$url"
    return
  fi

  die "curl or wget is required"
}

verify_full_toolset() {
  local bin_dir="${FST_INSTALL_BIN_DIR:-$HOME/.local/bin}"
  local fst_bin="$bin_dir/fst"
  local help
  local command
  local missing=()
  local required=(
    info
    config
    agents
    compatibility
    store
    action
    process
    decision
    requirements
    audit
    authority
    serve
    reviewer
    action-package
    console
    approvals
    mcp
    logs
    credentials
    email
    scenarios
    skills
    account
  )

  [[ -x "$fst_bin" ]] || die "installed fst command not found at $fst_bin"

  help="$("$fst_bin" --help 2>&1)" || die "installed fst command failed --help"

  for command in "${required[@]}"; do
    if ! printf '%s\n' "$help" | grep -F "$command" >/dev/null; then
      missing+=("$command")
    fi
  done

  if [[ "${#missing[@]}" -gt 0 ]]; then
    die "installed fst is missing full toolset commands: ${missing[*]}"
  fi

  info "verified full FST toolset command surface"
}

detect_os() {
  case "$(uname -s)" in
    Linux) echo "linux" ;;
    *) die "unsupported operating system: $(uname -s). The MVP package is Linux-only." ;;
  esac
}

detect_arch() {
  case "$(uname -m)" in
    x86_64|amd64) echo "amd64" ;;
    *) die "unsupported architecture: $(uname -m). The MVP package is linux/amd64 only." ;;
  esac
}

need_command tar
need_command uname
need_command mktemp

repo="${FST_GITHUB_REPO:-fernsehturm/fernsehturm}"
os="$(detect_os)"
arch="$(detect_arch)"
asset="${FST_INSTALL_ASSET:-fst_${os}_${arch}.tar.gz}"
checksum_asset="${FST_CHECKSUM_ASSET:-checksums.txt}"

if [[ -n "${FST_RELEASE_BASE:-}" ]]; then
  release_base="${FST_RELEASE_BASE%/}"
elif [[ -n "${FST_INSTALL_VERSION:-}" ]]; then
  release_base="https://github.com/$repo/releases/download/$FST_INSTALL_VERSION"
else
  release_base="https://github.com/$repo/releases/latest/download"
fi

work_dir="$(mktemp -d /tmp/fst-install.XXXXXX)"
trap 'rm -rf "$work_dir"' EXIT

archive="$work_dir/$asset"
checksums="$work_dir/$checksum_asset"
extract_dir="$work_dir/extract"
mkdir -p "$extract_dir"

info "downloading $release_base/$asset"
download "$release_base/$asset" "$archive"

if [[ "${FST_INSTALL_SKIP_CHECKSUM:-0}" != "1" ]]; then
  if command -v sha256sum >/dev/null 2>&1; then
    if download "$release_base/$checksum_asset" "$checksums" >/dev/null 2>&1; then
      if grep -F " $asset" "$checksums" >"$work_dir/$asset.sha256"; then
        info "verifying checksum"
        (cd "$work_dir" && sha256sum -c "$asset.sha256")
      else
        info "checksum file does not list $asset; skipping checksum verification"
      fi
    else
      info "checksums.txt not available; skipping checksum verification"
    fi
  else
    info "sha256sum not available; skipping checksum verification"
  fi
fi

info "extracting package"
tar -xzf "$archive" -C "$extract_dir"

[[ -x "$extract_dir/install.sh" ]] || die "downloaded package does not contain executable install.sh"

install_args=()
if [[ "${FST_INSTALL_FORCE:-1}" == "1" ]]; then
  install_args+=(--force)
fi

info "running package installer"
"$extract_dir/install.sh" "${install_args[@]}"
verify_full_toolset
