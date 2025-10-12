const IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg'];

export type PreviewKind = 'image' | 'document';

export const resolvePreviewKind = (fileName?: string | null): PreviewKind => {
  if (!fileName) return 'document';
  const ext = fileName.split('.').pop()?.toLowerCase();
  if (ext && IMAGE_EXTENSIONS.includes(ext)) {
    return 'image';
  }
  if (fileName.startsWith('data:image')) {
    return 'image';
  }
  return 'document';
};

export const resolvePreviewSource = (kind: PreviewKind, fallback?: string) => {
  if (kind === 'image') {
    return fallback || '/previews/photo-placeholder.svg';
  }
  return fallback || '/previews/document-placeholder.svg';
};

export const formatFileName = (fileName?: string | null) => {
  if (!fileName) return 'Belum ada file';
  if (fileName.startsWith('data:')) {
    return 'Pratinjau tersimpan';
  }
  return fileName;
};
