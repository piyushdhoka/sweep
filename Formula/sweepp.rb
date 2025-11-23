class Sweepp < Formula
  desc "Sweep unused imports and code from JS/TS projects"
  homepage "https://github.com/piyushdhoka/sweep"
  url "https://registry.npmjs.org/sweepp/-/sweepp-2.0.0.tgz"
  sha256 "AE8990B65894828B2CD73A6D0533751918B3EBE5F5780B4AD8A04963F774EBEE"
  license "MIT"

  depends_on "node"

  def install
    system "npm", "install", "-g", "sweepp"
  end

  test do
    system "#{bin}/sweepp", "--version"
  end
end