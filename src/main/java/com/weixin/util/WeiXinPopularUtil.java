package com.weixin.util;

import java.nio.charset.Charset;
import java.util.List;

import org.apache.http.Header;
import org.apache.http.HttpHeaders;
import org.apache.http.client.methods.HttpUriRequest;
import org.apache.http.client.methods.RequestBuilder;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.StringEntity;
import org.apache.http.message.BasicHeader;

import weixin.popular.api.API;
import weixin.popular.bean.BaseResult;
import weixin.popular.bean.message.Article;
import weixin.popular.client.LocalHttpClient;
import weixin.popular.util.JsonUtil;

//这个类是因为 weixin-popular 有些代码有问题，在它代码上修改 移植过来
public class WeiXinPopularUtil {
	
	protected static final String BASE_URI = "https://api.weixin.qq.com";
	protected static Header jsonHeader = new BasicHeader(HttpHeaders.CONTENT_TYPE,ContentType.APPLICATION_JSON.toString());
	protected static final String PARAM_AUTHORIZER_ACCESS_TOKEN = "authorizer_access_token";
	protected static final String PARAM_ACCESS_TOKEN = "access_token";
	
	
	/**
	 * 修改永久图文素材
	 * @param access_token
	 * @param media_id 	要修改的图文消息的id
	 * @param index 	要更新的文章在图文消息中的位置（多图文消息时，此字段才有意义），第一篇为0
	 * @param articles
	 * @return
	 */
	public static BaseResult materialUpdate_news(String access_token,String media_id,int index,List<Article> articles){
		String str = JsonUtil.toJSONString(articles);
		str = str.substring(1, str.length()-1);
		String messageJson = "{\"media_id\":\""+media_id+"\",\"index\":"+index+",\"articles\":"+str+"}";
		HttpUriRequest httpUriRequest = RequestBuilder.post()
										.setHeader(jsonHeader)
										.setUri(BASE_URI+"/cgi-bin/material/update_news")
										.addParameter(getATPN(), access_token)
										.setEntity(new StringEntity(messageJson,Charset.forName("utf-8")))
										.build();
		return LocalHttpClient.executeJsonResult(httpUriRequest,BaseResult.class);
	}
	
	/**
	 * 获取 access token param name 名称
	 * 
	 * 2.6.0
	 * @return access_token or authorizer_access_token
	 */
	protected static String getATPN(){
		if(API.currentMode() == API.MODE_COMPONENT){ 
			return PARAM_AUTHORIZER_ACCESS_TOKEN;
		}else{
			return PARAM_ACCESS_TOKEN;
		}
	}

}
