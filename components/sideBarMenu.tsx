import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/routeReducer";
import { fetchFolders } from "../redux/actions/folderAction";
import { Folder } from "@/interfaces/Folder";
import { setCurrentFolder } from "@/redux/slices/folderSlice";

const SidebarMenu = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleFolderClick = (folder: string, folderId: string) => {
    dispatch(setCurrentFolder({ name: folder, folderId }));
    router.push(`/folder/${folder}`);
  };

  const createNewFolder = () => {
    router.push("/folder/new");
  };

  useEffect(() => {
    dispatch(fetchFolders() as any);
  }, []);

  const folders = useSelector((state: RootState) => state.folders.folders);
  const loading = useSelector((state: RootState) => state.folders.loading);
  const error = useSelector((state: RootState) => state.folders.error);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <nav className="bg-gray-100 h-screen w-48 fixed left-0 top-0">
      <ul className="p-4 space-y-2">
        {folders.map((folder: Folder) => (
          <li key={folder.folder_id}>
            <button
              className="block w-full py-2 px-4 text-left hover:bg-gray-200"
              onClick={() => handleFolderClick(folder.name, folder.folder_id)}
            >
              {folder.name}
            </button>
          </li>
        ))}
        {folders.length > 0 && <hr className="my-2 border-gray-300" />}
        <li>
          <button
            className="block w-full py-2 px-4 text-left font-bold hover:bg-gray-200"
            onClick={() => createNewFolder()}
          >
            {"Crear Carpeta"}
          </button>
        </li>
        <li></li>
      </ul>
    </nav>
  );
};

export default SidebarMenu;
