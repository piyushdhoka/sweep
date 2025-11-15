import fg from 'fast-glob';
import path from 'path';

export interface DiscoverOptions {
  root: string;
  extensions: string[];
  ignore: string[];
}

export async function discoverFiles(patternOrDir: string, opts: DiscoverOptions): Promise<string[]> {
  const isDir = !/[?*]/.test(patternOrDir);
  const base = path.resolve(patternOrDir);
  const extsPattern = opts.extensions.map(e => e.startsWith('.') ? e.slice(1) : e).join(',');
  const globPattern = isDir ? `${base.replace(/\\/g,'/')}/**/*.{${extsPattern}}` : patternOrDir;
  const ignore = opts.ignore.map(i => i.replace(/\\/g,'/'));
  return fg(globPattern, { ignore, dot: false, onlyFiles: true });
}
