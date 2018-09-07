import React from "react";
import { connect } from "dva";
import styles from "./IndexPage.css";

@connect(state => ({
  dataList: state.index.dataList
}))
class IndexPage extends React.Component {
  state = {
    isShowModel: false,
    receiver: "",
    phoneNum: "",
    areaInfo: "",
    address: "",
    postNum: "",
    activeItemIndex: -1,
    confirmDel: false
  };
  hideModel = () => {
    this.setState({
      isShowModel: false
    });
  };
  showModel = () => {
    this.setState({
      isShowModel: true,
      activeItemIndex: -1,
      receiver: "",
      phoneNum: "",
      areaInfo: "",
      address: "",
      postNum: ""
    });
  };
  handleEdit = (record, index) => {
    const { receiver, phoneNum, areaInfo, address, postNum } = record;
    this.setState({
      activeItemIndex: index,
      isShowModel: true,
      receiver,
      phoneNum,
      areaInfo,
      address,
      postNum
    });
  };
  handleSave = () => {
    const {
      receiver,
      phoneNum,
      areaInfo,
      address,
      postNum,
      activeItemIndex
    } = this.state;
    if (receiver && phoneNum && areaInfo && address) {
      if (activeItemIndex < 0) {
        this.props
          .dispatch({
            type: "index/addItem",
            payload: {
              receiver,
              phoneNum,
              areaInfo,
              address,
              postNum
            }
          })
          .then(() => {
            this.setState({
              isShowModel: false
            });
          });
      } else {
        this.props
          .dispatch({
            type: "index/editItem",
            payload: {
              req: {
                receiver,
                phoneNum,
                areaInfo,
                address,
                postNum
              },
              index: activeItemIndex
            }
          })
          .then(() => {
            this.setState({
              isShowModel: false
            });
          });
      }
    } else {
      alert("请填写完整");
    }
  };
  showConfirm = activeItemIndex => {
    this.setState({
      confirmDel: true,
      activeItemIndex
    });
  };
  hancleCancel = () => {
    this.setState({
      confirmDel: false
    });
  };
  handleDel = () => {
    const { activeItemIndex } = this.state;
    this.props
      .dispatch({
        type: "index/delItem",
        payload: {
          activeItemIndex
        }
      })
      .then(() => {
        this.setState({
          confirmDel: false,
          isShowModel: false
        });
      });
  };
  render() {
    const { dataList } = this.props;
    const {
      isShowModel,
      receiver,
      phoneNum,
      areaInfo,
      address,
      postNum,
      activeItemIndex,
      confirmDel
    } = this.state;
    return (
      <div>
        <div className={styles.sectionwrap}>
          {dataList.map((item, index) => (
            <div key={index} className={styles.section}>
              <div className={styles.userinfo}>
                <span>收货人: {item.receiver}</span>
                <span>{item.phoneNum}</span>
              </div>
              <div className={styles.address}>地址: {item.address}</div>
              <div className={styles.sectionfooter}>
                <div>
                  <label>
                    <input
                      type="radio"
                      name="radio"
                      className={styles.setdefault}
                    />
                    <span>设为默认</span>
                  </label>
                </div>
                <div>
                  <span onClick={() => this.handleEdit(item, index)}>编辑</span>
                  <span className={styles.verticalline} />
                  <span onClick={() => this.showConfirm(index)}>删除</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div
          className={styles.addItemModel}
          style={{
            bottom: isShowModel ? 0 : -1500
          }}
        >
          <div className={styles.title}>
            新建收货地址
            <span className={styles.close} onClick={this.hideModel}>
              ×
            </span>
          </div>
          <div className={styles.formwrap}>
            <div className={styles.formitemwrap}>
              <span>收货人</span>{" "}
              <input
                value={receiver}
                placeholder="请填写收货人姓名"
                onChange={e => {
                  this.setState({
                    receiver: e.target.value
                  });
                }}
              />
            </div>
            <div className={styles.formitemwrap}>
              <span>手机号码</span>{" "}
              <input
                value={phoneNum}
                placeholder="请填写手机号"
                onChange={e => {
                  this.setState({
                    phoneNum: e.target.value
                  });
                }}
              />
            </div>
            <div className={styles.formitemwrap}>
              <span>区域信息</span>{" "}
              <input
                value={areaInfo}
                placeholder="请填写区域信息"
                onChange={e => {
                  this.setState({
                    areaInfo: e.target.value
                  });
                }}
              />
            </div>
            <div className={styles.formitemwrap}>
              <span>详细地址</span>{" "}
              <input
                value={address}
                placeholder="请输入街道门牌信息"
                onChange={e => {
                  this.setState({
                    address: e.target.value
                  });
                }}
              />
            </div>
            <div className={styles.formitemwrap}>
              <span>邮政编码</span>{" "}
              <input
                value={postNum}
                placeholder="可以不填"
                onChange={e => {
                  this.setState({
                    postNum: e.target.value
                  });
                }}
              />
            </div>
          </div>
          <div className={styles.savebtnwrap}>
            <button className={styles.btnsave} onClick={this.handleSave}>
              保存
            </button>
            <button
              style={{
                display: activeItemIndex < 0 ? "none" : "inline-block"
              }}
              className={styles.btndel}
              onClick={this.handleDel}
            >
              删除
            </button>
          </div>
        </div>
        <div className={styles.footer}>
          <button onClick={this.showModel}>点击添加新地址</button>
        </div>
        <div
          className={styles.mask}
          style={{
            display: confirmDel ? "block" : "none"
          }}
        />
        <div
          className={styles.confirm}
          style={{
            display: confirmDel ? "block" : "none"
          }}
        >
          <div className={styles.confirmtext}>确定要删除吗?</div>
          <div className={styles.confirmbuttonwrap}>
            <button onClick={this.hancleCancel}>取消</button>
            <button onClick={this.handleDel} className={styles.btnconfirm}>
              确定
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default IndexPage;
