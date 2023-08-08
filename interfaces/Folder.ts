export interface Folder {
  folder_id: string;
  name: string;
}

export interface FolderState {
  folders: Folder[];
  loading: boolean;
  error: string | null;
  currentFolder: {
    name: string;
    folderId: string;
  };
}

export interface CurrentFolder {
  name: string;
  folderId: string;
}
