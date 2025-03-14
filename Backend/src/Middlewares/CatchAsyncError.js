export const CatchAsyncError = (theFunction) => {
  return (req, res, next) => {
    Promise.resolve(theFunction(req, res, next)).catch((error) => {
      // Hàm này chỉ xử lý các lỗi bất đồng bộ (promise), và các lỗi đồng bộ do lệnh throw new Error()
      // Còn trong theFunction() mà quăng next(error) thì hàm này không can thiệp mà nó nhảy thẳng đến middleWare về lõi để xủ lý
      console.log("lỗi ở catchasync: ", error.message);
      next(error);
    });
  };
};
