export interface IFile {
  lastModified: number;
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
  originFileObj?: any;
  status?: string;
}
