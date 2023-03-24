export default (attr: string): boolean => {
  const regEx = /data-(\S+)/;

  return regEx.test(attr);
};
