interface ImportMetaEnv {
    readonly VITE_API: string;
    readonly VITE_URL: string;


}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}