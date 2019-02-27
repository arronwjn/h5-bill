
/**
 * Created by Tanikawa on 2018/1/24.
 */
(function () {
    var vueObj = new Vue({
        el : 'body',
        data : {
            applicationInfo : [],
            showCardEye : 0,
            phoneType : 0,
            ajaxSuccessReturn : true
        },
        created : function () {
            var _this = this;
            _this.phoneType = iosOrAndroid();
            //对allData做数据转换
            allData = allData.replace(/\t/g, ' ').replace(/\r\n|\n|\r/g, '<br>').replace(/\\/g,'\\\\');
            allData = JSON.parse(allData);
            _this.applicationInfo = allData;
            _this.showCardEye = showCardEye;
            _this.applicationInfo['level'] = _this.start(allData['level']);
            _this.applicationInfo['taxstart'] = _this.start(allData['taxstart']);
            //个人进度
            if (allData['usercloud']) {
                if (allData['usercloud']['progress'] && allData['usercloud']['progress'] != 0) {
                    _this.applicationInfo['usercloud']['progress'] = allData['personal_progress'];
                } else {
                    _this.applicationInfo['usercloud']['progress'] = '';
                }
            }
            if (allData['companycloud']) {
                _this.applicationInfo['companycloud'] = allData['company_progress'];
            }
            //项目进度

            //需求方式
            var needArr = {
                '1': '租赁',
                '2': '购置',
                '3': '合作'
            };
            var str = '';
            for (var k in allData['need']) {
                if (allData['need'] != '') {
                    if (k == allData['needCount']-1) {
                        str += needArr[allData['need'][k]];
                    } else {
                        str += needArr[allData['need'][k]]+'，';
                    }
                }
            }
            _this.applicationInfo['need'] = str;
            //土地类型
            var landtype = {
                '1': '工业用地',
                '2': '商业用地',
                '3': '综合用地',
                '4': '住宅用地',
                '5': '其他用地'
            };
            _this.applicationInfo['landtype'] = landtype[allData['landtype']];
            //层数需求
            var floor = {
                '1': '单层',
                '2': '多层',
                '3': '综合用地'
            };
            _this.applicationInfo['floor'] = floor[allData['floor']];
            //消防等级
            var fire_control_level = {
                '1': '甲',
                '2': '乙',
                '3': '丙一',
                '4': '丙二',
                '5': '丁',
                '6': '戊'
            };
            var fireStr = '';
            for (var fir in allData['fire_control_level']) {
                if (fir == 0) {
                    fireStr = fireStr + fire_control_level[allData['fire_control_level'][fir]];
                } else {
                    fireStr = fireStr +','+fire_control_level[allData['fire_control_level'][fir]];
                }
            }
            if(fireStr == "undefined"){
                _this.applicationInfo['fire_control_level'] = '';
            }else{
                _this.applicationInfo['fire_control_level'] = fireStr;
            }
            //仓库类型
            var depot_type = {
                '1': '高台',
                '2': '平台',
                '3': '立体库'
            };
            _this.applicationInfo['depot_type'] = depot_type[allData['depot_type']];
            //卸货平台
            var unload_type = {
                '1': '双面卸货平台',
                '2': '单面卸货平台',
                '3': '内置平台',
                '4': '外置平台',
                '5': '内外混合平台',
                '6': '无'
            };
            _this.applicationInfo['unload_type'] = unload_type[allData['unload_type']];
            //是否托管服务
            var yesorno = {
                '1': '是',
                '0': '否',
                '2': '否'
            };
            _this.applicationInfo['idc_distribution'] = yesorno[allData['idc_distribution']];
            _this.applicationInfo['needrack'] = yesorno[allData['needrack']];
            _this.applicationInfo['isregister'] = yesorno[allData['isregister']];
            _this.applicationInfo['tianche'] = yesorno[allData['tianche']];

            //商业类型
            var malltypeArr = {
                '1': '购物中心',
                '2': '商业综合体',
                '3': '社区商业',
                '4': '商业街',
                '5': '写字楼配套',
                '6': '商业裙楼',
                '10': '其他'
            };
            _this.applicationInfo['mall_type'] = malltypeArr[allData['mall_type']];
            //企业类型
            var comtype = {
                '1': '内资',
                '2': '外资',
                '3': '合资'
            };
            _this.applicationInfo['comtype'] = comtype[allData['comtype']];
            //备注中进度
            var statusArr = {
                '1': '接洽中',
                '2': '成功',
                '3': '回收',
                '4': '重点',
                '5': '暂缓'
            };

            var wuyeArr = {
                '1': '写字楼',
                '2': '商务酒店',
                '3': '商住酒店',
                '4': '独栋别墅',
                '5': '厂房办公',
                '6': '孵化器',
                '7': '研发楼'
            };
            //联系类型
            var contactTypeArr = {
                '1': '电话',
                '2': '邮件',
                '3': '短信',
                '4': '见面拜访',
                '5': '勘察',
                '6': '带看',
                '7': '线上联络',
                '8': '微信QQ',
                '9': '未联系',
                '11': '来访接待',
                '12': '分配项目',
                '10': '其他',

            };

            _this.applicationInfo['wuye'] = wuyeArr[allData['wuye']];

            for (var i in _this.applicationInfo['cloud']['item_cloud']) {

                var id = _this.applicationInfo['cloud']['item_cloud'][i]['progress'];
                if (id != 0) {
                    var progressData = allData['cloud']['item_cloud'];
                    if(progressData){
                        _this.applicationInfo['cloud']['item_cloud'][i]['progress'] = progressData[i]['progress_name'];
                    }
                } else {
                    _this.applicationInfo['cloud']['item_cloud'][i]['progress'] = '';
                }

                var status = _this.applicationInfo['cloud']['item_cloud'][i]['status'];
                var contactType = _this.applicationInfo['cloud']['item_cloud'][i]['contact_type'];
                _this.applicationInfo['cloud']['item_cloud'][i]['status'] = statusArr[status];
                _this.applicationInfo['cloud']['item_cloud'][i]['contact_type'] = contactTypeArr[contactType];

                var str = _this.applicationInfo['cloud']['item_cloud'][i]['cloud'];
                _this.applicationInfo['cloud']['item_cloud'][i]['cloud'] = _this.entityToString(str);

                for (var j in _this.applicationInfo['cloud']['item_cloud'][i]['commentList']) {
                    var strr = _this.applicationInfo['cloud']['item_cloud'][i]['commentList'][j]['comment'];
                    _this.applicationInfo['cloud']['item_cloud'][i]['commentList'][j]['comment'] = _this.entityToString(strr);
                }
            }

        },
        ready : function () {
            var _this = this;
            if (_this.phoneType == 1) {
                _this.showMot();
            }
            // $('#approve-opt').fixBugFixed();
            $('#item-opt').on('tap', '.weui-navbar__item', function () {
                var data = {};
                var opt = $(this).attr('data-op');
                switch (opt) {
                    case 'beizhu':
                        _this.beizu();
                        break;
                    case 'back' :
                        _this.back();
                        break;
                    case 'look-card':
                        _this.lookCard();
                        break;
                    case 'apply-card':
                        _this.applyCard();
                        break;
                }
            });
            $('#log-remarks').on('tap', '.cloud-logo', function () {
                var index = $(this).attr('data-index');
                var uid = $(this).attr('data-uid');
                var cloudUid = _this.applicationInfo['cloud']['item_cloud'][index]['uid'];
                var data = {};
                if (cloudUid == uid) {
                    data = {
                        0 : cloudUid
                    };
                } else {
                    data = {
                        0 : cloudUid,
                        1 : uid
                    };
                }
                var ajaxData = {
                    uid : data,
                    id : _this.applicationInfo['cloud']['item_cloud'][index]['id']
                };
                if (_this.phoneType == 1) {
                    try {
                        window.webkit.messageHandlers.addComment.postMessage(ajaxData);
                    } catch(e){
                        console.log(e);
                    }
                } else {
                    ajaxData = JSON.stringify(ajaxData);
                    location.href = 'addComment/?jsonAndroidTk='+ajaxData;
                }

            });
            $('.file-array').on('tap', '.look-file', function () {
                var url = $(this).attr('data-url');
                var data = {
                    url : url
                };
                if (_this.phoneType == 1) {
                    try {
                        window.webkit.messageHandlers.lookFile.postMessage(data);
                    } catch(e){
                        console.log(e);
                    }
                } else {
                    data = JSON.stringify(data);
                    location.href = 'lookFile/?jsonAndroidTk='+data;
                }

            });

            $(document).on('tap', '.weui-cell .call', function () {
                var call = $(this).attr('data-call');
                var data = {
                    call : call
                };
                if (_this.phoneType == 1) {
                    try {
                        window.webkit.messageHandlers.call.postMessage(data);
                    } catch(e){
                        console.log(e);
                    }
                } else {
                    data = JSON.stringify(data);
                    location.href = 'call/?jsonAndroidTk='+data;
                }

            });
        },
        methods : {
            start : function (index) { //星级转换
                var startString = '';
                for (var i = 0; i < index; i++) {
                    startString += '★';
                }
                return startString;
            },
            beizu : function () {
                var data = {
                    id:this.applicationInfo.id
                };
                if (this.phoneType == 1) {
                    try {
                        window.webkit.messageHandlers.remarks.postMessage(data);
                    } catch(e){
                        console.log(e);
                    }
                } else {
                    data = JSON.stringify(data);
                    location.href = 'remarks/?jsonAndroidTk='+data;
                }

            },
            back : function () {
                var data = {
                    id:this.applicationInfo.id
                };
                if (this.phoneType == 1) {
                    try {
                        window.webkit.messageHandlers.back.postMessage(data);
                    } catch(e){
                        console.log(e);
                    }
                } else {
                    data = JSON.stringify(data);
                    location.href = 'back/?jsonAndroidTk='+data;
                }

            },
            applyCard : function () {
                var _this = this;
                var data = {
                    name:_this.applicationInfo.title,
                    manager : _this.applicationInfo.item_manager_name
                };
                if (_this.phoneType == 1) {
                    try {
                        window.webkit.messageHandlers.applyCard.postMessage(data);
                    } catch(e){
                        console.log(e);
                    }
                } else {
                    data = JSON.stringify(data);
                    location.href = 'applyCard/?jsonAndroidTk='+data;
                }

            },
            lookCard : function () {
                var _this = this;
                _this.ajaxSuccessReturn = false;
                $.ajax({
                    url:"/api.php/Item/showCard",
                    type:'POST',
                    data:{
                        itemId:_this.applicationInfo.id,
                        type : 1,
                        uid : uid,
                        token : token
                    },
                    success:function(data){
                        if(data.code == 200){
                            _this.applicationInfo.card = [];
                            _this.applicationInfo.showCardEye = '';
                            $.each(data.data,function (index) {
                                _this.applicationInfo.card.push(data.data[index]);
                                _this.applicationInfo.showCardEye = '0';
                            })
                        }
                        _this.ajaxSuccessReturn = true;
                    }
                });
            },
            entityToString: function (entity) {
                var div=document.createElement('div');
                div.innerHTML = entity;
                var res=div.innerText||div.textContent;
                return res;
            },
            showMot:function () {
                var _this = this;
                var data = {
                    isShow : _this.applicationInfo['showMot']
                };
                if (_this.phoneType == 1) {
                    try {
                        window.webkit.messageHandlers.showMot.postMessage(data);
                    } catch(e){
                        console.log(e);
                    }
                } else {
                    data = JSON.stringify(data);
                    location.href = 'showMot/?jsonAndroidTk='+data;
                }
            }
        }
    });
})();
