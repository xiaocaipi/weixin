package com.weixin.util;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;



public class NetUtil {

	
	public static Document goFetch(String districtUrl, Document doc,HashMap<String, Object> paraMap) throws Exception {
		String timeout=(String)paraMap.get("timeout");
		String ip ="";
		if(timeout==null){
			timeout="2000";
		}
		
		
		try {
			doc = Jsoup.connect(districtUrl).timeout(Integer.parseInt(timeout)).userAgent("Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.112 Safari/537.36").get() ;
		} catch (IOException e) {
			System.out.println("获取网页--"+districtUrl+"失败"+"失败的ip---"+ ip);
		}
		Thread.sleep(1000);
		return doc;
	}
	
}
