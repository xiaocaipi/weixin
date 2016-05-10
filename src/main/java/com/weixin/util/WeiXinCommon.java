package com.weixin.util;

import java.io.DataInputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import weixin.popular.api.TokenAPI;
import weixin.popular.bean.token.Token;

public class WeiXinCommon {
	
	public static String getToken(){
		Token token = TokenAPI.token("wx436dfcb8a1a76be0","d76669edcde1bd6845c76d7dcedb1899");
		return token.getAccess_token();
	}
	
	
	
	//download  pic   with list
	public static int downloadPictureList(ArrayList<String> urlList) {  
        URL url = null;  
        int imageNumber = 0;  
          
        for (String urlString : urlList) {  
            try {  
                url = new URL(urlString);  
                DataInputStream dataInputStream = new DataInputStream(url.openStream());  
                String imageName = imageNumber + ".jpg";  
                FileOutputStream fileOutputStream = new FileOutputStream(new File(imageName));  
  
                byte[] buffer = new byte[1024];  
                int length;  
  
                while ((length = dataInputStream.read(buffer)) > 0) {  
                    fileOutputStream.write(buffer, 0, length);  
                }  
  
                dataInputStream.close();  
                fileOutputStream.close();  
                imageNumber++;  
            } catch (MalformedURLException e) {  
                e.printStackTrace();  
            } catch (IOException e) {  
                e.printStackTrace();  
            }  
        }  
        return 1;
    } 
	
	//download  pic   
	public static String downloadPicture(String picUrl,String picName,String picPath) {  
	        URL url = null;  
	        String imageName = picName + ".jpg";   
	        
            try {  
                url = new URL(picUrl);  
                DataInputStream dataInputStream = new DataInputStream(url.openStream());  
               
                FileOutputStream fileOutputStream = new FileOutputStream(new File(picPath+imageName));  
  
                byte[] buffer = new byte[1024];  
                int length;  
  
                while ((length = dataInputStream.read(buffer)) > 0) {  
                    fileOutputStream.write(buffer, 0, length);  
                }  
  
                dataInputStream.close();  
                fileOutputStream.close();  
            } catch (MalformedURLException e) {  
                e.printStackTrace();  
            } catch (IOException e) {  
                e.printStackTrace();  
            }  
        
	        return picPath+imageName;
	    }
	
	
	public static String getRegexContent(String content ,String regex){
		String returnContent ="";
		Pattern pattern = Pattern.compile(regex);
		Matcher matcher = pattern.matcher(content);
		while (matcher.find()) {
			String picUrl = matcher.group(0);
			returnContent = picUrl;
		}
		
		return returnContent;
		
	}
	
	
	

}
