package com.weixin;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.jsoup.nodes.Document;
import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.AbstractJUnit4SpringContextTests;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.weixin.dao.MaterialDao;
import com.weixin.service.MaterialService;
import com.weixin.vo.Material;


@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "file:WebContent/WEB-INF/weixin-servlet.xml",
		"file:WebContent/WEB-INF/ibatis-config.xml" })
public class materialTest extends AbstractJUnit4SpringContextTests {

	HashMap<String, Object> paraMap = new HashMap<String, Object>();
	
	@Autowired(required=true)
	 @Qualifier("materialService") 
	public MaterialService materialService;

//	@Test
//	public void insertMaterialPicTest() throws Exception {
//
//		String local_path ="/home/caidanfeng733/weixin/pic/main.jpg";
//		materialService.insertMaterialPic(local_path, null, null);
//	}
	
	@Test
	public void insertMaterialWoldPicTest() throws Exception {

		String url = "http://mp.weixin.qq.com/s?__biz=MzAwODEzMjY2MA==&mid=2656627379&idx=1&sn=a0076b593d6a90e2578de93b3271ca3b&scene=1&srcid=0509bMbM5CkF2RZVV56deaLR#rd";
		materialService.insertMaterialWoldPic(url);
//		System.out.println(111);
	}
//	@Test
//	public void updateMaterialWoldPicTest() throws Exception {
//
//		materialService.updateMaterialWoldPic();
//	}
	

}
