export default {
  namespace: "index",

  state: {
    dataList: [
      {
        receiver: "测试",
        address: "浙江省 杭州市 拱墅区 北部软件园",
        phoneNum: "15925602033",
        areaInfo: "xxxxxxx",
        postNum: "000000"
      },
      {
        receiver: "测试",
        address: "江苏省 南京市 玄武区 被涂抹",
        phoneNum: "15925602033",
        areaInfo: "xxxaaaaaaaaaaaaaax",
        postNum: "000000"
      }
    ]
  },

  subscriptions: {},

  effects: {
    *addItem({ payload }, { put }) {
      yield put({ type: "addItemSuccess", payload });
    },
    *editItem({ payload }, { put }) {
      yield put({ type: "editItemSuccess", payload });
    },
    *delItem({ payload }, { put }) {
      yield put({ type: "delItemSuccess", payload });
    }
  },

  reducers: {
    addItemSuccess(state, { payload }) {
      const { dataList } = state;
      dataList.push(payload);
      return { ...state, dataList: dataList.map(item => item) };
    },
    editItemSuccess(state, { payload }) {
      const { index, req } = payload;
      const { dataList } = state;
      dataList[index] = req;
      return { ...state, dataList: dataList.map(item => item) };
    },
    delItemSuccess(state, { payload }) {
      const { activeItemIndex } = payload;
      const { dataList } = state;
      dataList.splice(activeItemIndex, 1);
      return { ...state, dataList: dataList.map(item => item) };
    }
  }
};
