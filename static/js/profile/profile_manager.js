function searchProfileByUserIdClick(){$('#sp_form')[0].reset();initSearchProfileTable([]);$('#search_profile_table').bootstrapTable('load',[]);$('#search_profile_dialog').modal('show');}function setProfilePortraitClick(){$('#spp_form')[0].reset();var tag_list=["Tag_Profile_IM_Nick","Tag_Profile_IM_Gender","Tag_Profile_IM_AllowType","Tag_Profile_IM_Image"];var options={'To_Account':[loginInfo.identifier],'TagList':tag_list};webim.getProfilePortrait(options,function(resp){if(resp.UserProfileItem&&resp.UserProfileItem.length>0){for(var i in resp.UserProfileItem){var nick,gender,allowType,image;for(var j in resp.UserProfileItem[i].ProfileItem){switch(resp.UserProfileItem[i].ProfileItem[j].Tag){case'Tag_Profile_IM_Nick':nick=resp.UserProfileItem[i].ProfileItem[j].Value;break;case'Tag_Profile_IM_Gender':gender=resp.UserProfileItem[i].ProfileItem[j].Value;break;case'Tag_Profile_IM_AllowType':allowType=resp.UserProfileItem[i].ProfileItem[j].Value;break;case'Tag_Profile_IM_Image':image=resp.UserProfileItem[i].ProfileItem[j].Value;break;}}$("#spp_image").val(image);$("#spp_nick").val(nick);var spp_gender_radios=document.spp_form.spp_gender_radio;for(var i=0;i<spp_gender_radios.length;i++){if(spp_gender_radios[i].value==gender){spp_gender_radios[i].checked=true;break;}}var spp_allow_type_radio=document.spp_form.spp_allow_type_radio;for(var i=0;i<spp_allow_type_radio.length;i++){if(spp_allow_type_radio[i].value==allowType){spp_allow_type_radio[i].checked=true;break;}}}}},function(err){alert(err.ErrorInfo);});$('#set_profile_portrait_dialog').modal('show');}function spOperateFormatter(value,row,index){return['<a class="plus" href="javascript:void(0)" title="添加好友">','<i class="glyphicon glyphicon-plus"></i>','</a>'].join('');}window.spOperateEvents={'click .plus':function(e,value,row,index){$('#af_to_account').val(row.To_Account);searchProfileAllowTypeByUserId(row.To_Account,function(allowType){$('#af_allow_type').val(allowType);webim.Log.info(allowType);if(allowType==null){alert('获取对方加好友设置失败');return;}if(allowType=='拒绝任何人'){alert('对方拒绝任何人加好友，无法加对方为好友');return;}if(allowType=='允许任何人'){applyAddFriend();}else{$("#af_add_wording").val('你好，我想和你成为朋友~~');$('#add_friend_dialog').modal('show');}},function(errmsg){alert(errmsg);});}};function initSearchProfileTable(data){$('#search_profile_table').bootstrapTable({method:'get',cache:false,height:500,striped:true,pagination:true,pageSize:pageSize,pageNumber:1,pageList:[10,20,50,100],search:true,showColumns:true,clickToSelect:true,columns:[{field:"To_Account",title:"账号",align:"center",valign:"middle",sortable:"true"},{field:"Nick",title:"昵称",align:"center",valign:"middle",sortable:"true"},{field:"Gender",title:"性别",align:"center",valign:"middle",sortable:"true"},{field:"AllowType",title:"加好友设置",align:"center",valign:"middle",sortable:"true",visible:false},{field:"Image",title:"头像地址",align:"center",valign:"middle",sortable:"true",visible:false},{field:"spOperate",title:"操作",align:"center",valign:"middle",formatter:"spOperateFormatter",events:"spOperateEvents"}],data:data,formatNoMatches:function(){return'无符合条件的记录';}});}var searchProfileByUserId=function(){if($("#sp_to_account").val().length==0){alert('请输入用户ID');return;}if(webim.Tool.trimStr($("#sp_to_account").val()).length==0){alert('您输入的用户ID全是空格,请重新输入');return;}var tag_list=["Tag_Profile_IM_Nick","Tag_Profile_IM_Gender","Tag_Profile_IM_AllowType","Tag_Profile_IM_Image"];var options={'To_Account':[$("#sp_to_account").val()],'TagList':tag_list};webim.getProfilePortrait(options,function(resp){var data=[];if(resp.UserProfileItem&&resp.UserProfileItem.length>0){for(var i in resp.UserProfileItem){var to_account=resp.UserProfileItem[i].To_Account;var nick=null,gender=null,allowType=null,imageUrl=null;for(var j in resp.UserProfileItem[i].ProfileItem){switch(resp.UserProfileItem[i].ProfileItem[j].Tag){case'Tag_Profile_IM_Nick':nick=resp.UserProfileItem[i].ProfileItem[j].Value;break;case'Tag_Profile_IM_Gender':switch(resp.UserProfileItem[i].ProfileItem[j].Value){case'Gender_Type_Male':gender='男';break;case'Gender_Type_Female':gender='女';break;case'Gender_Type_Unknown':gender='未知';break;}break;case'Tag_Profile_IM_AllowType':switch(resp.UserProfileItem[i].ProfileItem[j].Value){case'AllowType_Type_AllowAny':allowType='允许任何人';break;case'AllowType_Type_NeedConfirm':allowType='需要确认';break;case'AllowType_Type_DenyAny':allowType='拒绝任何人';break;default:allowType='需要确认';break;}break;case'Tag_Profile_IM_Image':imageUrl=resp.UserProfileItem[i].ProfileItem[j].Value;break;}}data.push({'To_Account':webim.Tool.formatText2Html(to_account),'Nick':webim.Tool.formatText2Html(nick),'Gender':gender,'AllowType':allowType,'Image':imageUrl});}}$('#search_profile_table').bootstrapTable('load',data);},function(err){alert(err.ErrorInfo);});};var searchProfileAllowTypeByUserId=function(to_account,cbok,cberr){var allowType='需要确认';if(to_account.length==0){if(cberr){cberr('对方帐号为空');return;}}var tag_list=["Tag_Profile_IM_AllowType"];var options={'To_Account':[to_account],'TagList':tag_list};webim.getProfilePortrait(options,function(resp){if(resp.UserProfileItem&&resp.UserProfileItem.length>0){for(var i in resp.UserProfileItem){for(var j in resp.UserProfileItem[i].ProfileItem){switch(resp.UserProfileItem[i].ProfileItem[j].Tag){case'Tag_Profile_IM_AllowType':switch(resp.UserProfileItem[i].ProfileItem[j].Value){case'AllowType_Type_AllowAny':allowType='允许任何人';break;case'AllowType_Type_NeedConfirm':allowType='需要确认';break;case'AllowType_Type_DenyAny':allowType='拒绝任何人';break;default:allowType='需要确认';break;}break;}}}}if(cbok){cbok(allowType);}},function(errmsg){if(cberr){cberr(errmsg);}});};var setProfilePortrait=function(){var image=$("#spp_image").val();if($("#spp_nick").val().length==0){alert('请输入昵称');return;}if(webim.Tool.trimStr($("#spp_nick").val()).length==0){alert('您输入的昵称全是空格,请重新输入');return;}var gender=$('input[name="spp_gender_radio"]:checked').val();if(!gender){alert('请选择性别');return;}var profile_item=[{"Tag":"Tag_Profile_IM_Nick","Value":$("#spp_nick").val()},{"Tag":"Tag_Profile_IM_Gender","Value":$('input[name="spp_gender_radio"]:checked').val()},{"Tag":"Tag_Profile_IM_AllowType","Value":$('input[name="spp_allow_type_radio"]:checked').val()}];if(image){profile_item.push({"Tag":"Tag_Profile_IM_Image","Value":image});}var options={'ProfileItem':profile_item};webim.setProfilePortrait(options,function(resp){$('#set_profile_portrait_dialog').modal('hide');loginInfo.identifierNick=$("#spp_nick").val();document.getElementById("t_my_name").innerHTML=webim.Tool.formatText2Html(loginInfo.identifierNick);alert('设置个人资料成功');},function(err){alert(err.ErrorInfo);});};