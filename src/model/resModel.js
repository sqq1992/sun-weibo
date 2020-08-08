
class BaseDataModel {

  constructor({
      success = true,
      data = null,
      message = ''
  }) {

    this.success = success;

    if(data){
      this.data = data;
    }

    if(message){
      this.message = message;
    }

  }

}

class SuccessDataModel extends BaseDataModel{
  constructor(data) {
    super({
      success:true,
      data
    });
  }
}

class ErrorDataModel extends BaseDataModel{
  constructor(message) {
    super({
      success:false,
      message
    });
  }
}

module.exports = {
  SuccessDataModel,
  ErrorDataModel
};