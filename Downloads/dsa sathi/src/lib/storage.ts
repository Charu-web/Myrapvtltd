// S3-Compatible Document Storage Abstraction

export interface UploadResult {
  fileUrl: string;
  fileKey: string;
  signedUrl: string;
}

export async function uploadDocumentToS3(
  fileName: string,
  _fileBuffer: Buffer | ArrayBuffer,
  _mimeType: string
): Promise<UploadResult> {
  const cleanName = fileName.replace(/[^a-zA-Z0-9._-]/g, '_');
  const fileKey = `docs/${Date.now()}_${cleanName}`;
  const fileUrl = `https://loanpilot-docs.s3.ap-south-1.amazonaws.com/${fileKey}`;
  const signedUrl = `${fileUrl}?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Expires=3600`;

  return {
    fileUrl,
    fileKey,
    signedUrl,
  };
}

export function getSignedDownloadUrl(fileKey: string): string {
  return `https://loanpilot-docs.s3.ap-south-1.amazonaws.com/${fileKey}?signed=true&expires=3600`;
}
