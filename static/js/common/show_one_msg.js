function addMsg(e,t){var r,n,i,o,a,m
  if(((a=e.getSession().type()),(r=e.getIsSend()),(n=e.getFromAccount()))){if(r)(i=loginInfo.identifierNick?loginInfo.identifierNick:n),(o=loginInfo.headurl?loginInfo.headurl:friendHeadUrl);else{var s=webim.SESSION_TYPE.C2C+"_"+n,c=infoMap[s];(i=c&&c.name?c.name:e.getFromAccountNick()?e.getFromAccountNick():n),(o=c&&c.image?c.image:e.fromAccountHeadurl?e.fromAccountHeadurl:friendHeadUrl)}var l=document.createElement("div");if(e.sending){l.id="id_"+e.random
  var g=document.createElement("div");(g.className="spinner"),(g.innerHTML='<div class="bounce1"></div> <div class="bounce2"></div> <div class="bounce3"></div>'),l.appendChild(g)}else $("#id_"+e.random).remove();l.className="onemsg";var T=document.createElement("p"),_=document.createElement("p"),b=document.createElement("pre");switch(((T.className="msghead"),(_.className="msgbody"),r&&(T.className="mehead")&&(_.className="mebody")&&(_.innerHTML="<div><img class='headurlClass imgList' src='"+o+"'><p>&nbsp;&nbsp;"+webim.Tool.formatText2Html(webim.Tool.formatTimeStamp(e.getTime()))+"</p></div>"),(T.innerHTML="<div><img class='headurlClass' src='"+o+"'><p>&nbsp;&nbsp;"+webim.Tool.formatText2Html(webim.Tool.formatTimeStamp(e.getTime()))+"</p></div>"),(m=e.getSubType()))){case webim.GROUP_MSG_SUB_TYPE.COMMON:b.innerHTML=convertMsgtoHtml(e);break
  case webim.GROUP_MSG_SUB_TYPE.REDPACKET:b.innerHTML="[群红包消息]"+convertMsgtoHtml(e);break
  case webim.GROUP_MSG_SUB_TYPE.LOVEMSG:b.innerHTML="[群点赞消息]"+convertMsgtoHtml(e);break
  case webim.GROUP_MSG_SUB_TYPE.TIP:b.innerHTML="[群提示消息]"+convertMsgtoHtml(e)}_.appendChild(b),l.appendChild(T),l.appendChild(_);var E=document.getElementsByClassName("msgflow")[0];t?(E.insertBefore(l,E.firstChild),0==E.scrollTop&&setTimeout(function(){E.scrollTop=0},300)):(E.appendChild(l),setTimeout(function(){E.scrollTop=E.scrollHeight},300))}}function convertMsgtoHtml(e){var t,r,n,i,o="";t=e.getElems();for(var a=t.length,m=0;m<a;m++)switch(((r=t[m]),(n=r.getType()),(i=r.getContent()),n)){case webim.MSG_ELEMENT_TYPE.TEXT:var s=convertTextMsgToHtml(i);o+=webim.Tool.formatText2Html(s);break
  case webim.MSG_ELEMENT_TYPE.FACE:o+=convertFaceMsgToHtml(i);break
  case webim.MSG_ELEMENT_TYPE.IMAGE:if(m<=a-2){var c=t[m+1],l=c.getContent().getData();(o+=convertImageMsgToHtml(i,l)),m++}else o+=convertImageMsgToHtml(i);break
  case webim.MSG_ELEMENT_TYPE.SOUND:o+=convertSoundMsgToHtml(i);break
  case webim.MSG_ELEMENT_TYPE.FILE:o+=convertFileMsgToHtml(i);break
  case webim.MSG_ELEMENT_TYPE.LOCATION:o+=convertLocationMsgToHtml(i);break
  case webim.MSG_ELEMENT_TYPE.CUSTOM:var s=convertCustomMsgToHtml(i);o+=webim.Tool.formatText2Html(s);break
  case webim.MSG_ELEMENT_TYPE.GROUP_TIP:var s=convertGroupTipMsgToHtml(i);o+=webim.Tool.formatText2Html(s);break
  default:webim.Log.error("未知消息元素类型: elemType="+n)}return o}function convertTextMsgToHtml(e){return e.getText()}function convertFaceMsgToHtml(e){var t=null,r=e.getData(),n=webim.EmotionDataIndexs[r],i=webim.Emotions[n];return i&&i[1]&&(t=i[1]),t?"<img src='"+t+"'/>":r}function convertImageMsgToHtml(e,t){var r=e.getImage(webim.IMAGE_TYPE.SMALL),n=e.getImage(webim.IMAGE_TYPE.LARGE),i=e.getImage(webim.IMAGE_TYPE.ORIGIN);return(n||(n=r),i||(i=r),"<img name='"+t+"' src='"+r.getUrl()+"#"+n.getUrl()+"#"+i.getUrl()+"' style='CURSOR: hand;cursor: pointer;' id='"+e.getImageId()+"' bigImgUrl='"+n.getUrl()+"' onclick='imageClick(this)' />")}function convertSoundMsgToHtml(e){var t=(e.getSecond(),e.getDownUrl());return"ie"==webim.BROWSER_INFO.type&&parseInt(webim.BROWSER_INFO.ver)<=8?"[这是一条语音消息]demo暂不支持ie8(含)以下浏览器播放语音,语音URL:"+t:'<audio id="uuid_'+e.uuid+'" src="'+t+'" controls="controls" onplay="onChangePlayAudio(this)" preload="none"></audio>'}function convertFileMsgToHtml(e){var t,r
  return((t=e.getSize()),(r="Byte"),t>=1024&&((t=Math.round(t/1024)),(r="KB")),'<a href="javascript:;" onclick=\'webim.onDownFile("'+e.uuid+'")\' title="点击下载文件" ><i class="glyphicon glyphicon-file">&nbsp;'+e.name+"("+t+r+")</i></a>")}function convertLocationMsgToHtml(e){return"经度="+e.getLongitude()+",纬度="+e.getLatitude()+",描述="+e.getDesc()}function convertCustomMsgToHtml(e){var t=e.getData(),r=e.getDesc(),n=e.getExt();return"data="+t+", desc="+r+", ext="+n}function convertGroupTipMsgToHtml(e){var t,r,n,i=10,o="",a=i-1
  switch(((t=e.getOpType()),(r=e.getOpUserId()),t)){case webim.GROUP_TIP_TYPE.JOIN:n=e.getUserIdList();for(var m in n)if(((o+=n[m]+","),n.length>i&&m==a)){o+="等"+n.length+"人";break};(o=o.substring(0,o.length-1)),(o+="加入该群，当前群成员数："+e.getGroupMemberNum());break
  case webim.GROUP_TIP_TYPE.QUIT:o+=r+"离开该群，当前群成员数："+e.getGroupMemberNum();break
  case webim.GROUP_TIP_TYPE.KICK:;(o+=r+"将"),(n=e.getUserIdList());for(var m in n)if(((o+=n[m]+","),n.length>i&&m==a)){o+="等"+n.length+"人";break}o+="踢出该群";break
  case webim.GROUP_TIP_TYPE.SET_ADMIN:;(o+=r+"将"),(n=e.getUserIdList());for(var m in n)if(((o+=n[m]+","),n.length>i&&m==a)){o+="等"+n.length+"人";break}o+="设为管理员";break
  case webim.GROUP_TIP_TYPE.CANCEL_ADMIN:;(o+=r+"取消"),(n=e.getUserIdList());for(var m in n)if(((o+=n[m]+","),n.length>i&&m==a)){o+="等"+n.length+"人";break}o+="的管理员资格";break
  case webim.GROUP_TIP_TYPE.MODIFY_GROUP_INFO:o+=r+"修改了群资料：";var s,c,l=e.getGroupInfoList();for(var m in l)switch(((s=l[m].getType()),(c=l[m].getValue()),s)){case webim.GROUP_TIP_MODIFY_GROUP_INFO_TYPE.FACE_URL:o+="群头像为"+c+"; ";break
  case webim.GROUP_TIP_MODIFY_GROUP_INFO_TYPE.NAME:o+="群名称为"+c+"; ";break
  case webim.GROUP_TIP_MODIFY_GROUP_INFO_TYPE.OWNER:o+="群主为"+c+"; ";break
  case webim.GROUP_TIP_MODIFY_GROUP_INFO_TYPE.NOTIFICATION:o+="群公告为"+c+"; ";break
  case webim.GROUP_TIP_MODIFY_GROUP_INFO_TYPE.INTRODUCTION:o+="群简介为"+c+"; ";break
  default:o+="未知信息为:type="+s+",value="+c+"; "}break
  case webim.GROUP_TIP_TYPE.MODIFY_MEMBER_INFO:o+=r+"修改了群成员资料:";var g,T,_=e.getMemberInfoList();for(var m in _)if(((g=_[m].getUserId()),(T=_[m].getShutupTime()),(o+=g+": "),(o+=null!=T&&void 0!==T?(0==T?"取消禁言; ":"禁言"+T+"秒; "):" shutupTime为空"),_.length>i&&m==a)){o+="等"+_.length+"人";break}break
  default:o+="未知群提示消息类型：type="+t}return o}