package com.weixin.util;

import weixin.popular.api.TokenAPI;
import weixin.popular.bean.token.Token;

public class WeiXinCommon {
	
	public static Token getToken(){
		Token token = TokenAPI.token("wx436dfcb8a1a76be0","d76669edcde1bd6845c76d7dcedb1899");
		return token;
	}

}
