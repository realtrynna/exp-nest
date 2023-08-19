/**
 * at 배열 내장 메서드는 Node v16.6이상부터 지원
 */
export const extractFileExt = (fileName) => {
  const splitFileName = fileName.split(".");
  return splitFileName.at(splitFileName.length - 1);
}