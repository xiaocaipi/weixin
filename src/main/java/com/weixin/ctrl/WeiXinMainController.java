package com.weixin.ctrl;

import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.multiaction.MultiActionController;

import com.weixin.service.MaterialService;
import com.weixin.util.JsonUtil;
import com.weixin.vo.WordPic;
import com.weixin.vo.WordPicItem;

@Controller
@RequestMapping("/weixin")
public class WeiXinMainController extends MultiActionController {
	
	@Autowired(required=true)
	 @Qualifier("materialService") 
	public MaterialService materialService;

	
	@RequestMapping(params = "method=enterdong")
	public ModelAndView enterdong(HttpServletRequest request, HttpServletResponse response) throws UnsupportedEncodingException {
		request.setCharacterEncoding("utf-8");
		response.setContentType("text/xml;charset=utf-8");
		String type = request.getParameter("type");
		request.setAttribute("type", type);

		return new ModelAndView("weixin/dong.jsp");
	}
	
	
	@RequestMapping(params = "method=dong")
	public ModelAndView dong(HttpServletRequest request, HttpServletResponse response) {
		WordPicItem  returnItem = new  WordPicItem();
		Map<String, String> paraMap = new HashMap<String, String>();
		String type = request.getParameter("type");
		if(StringUtils.isEmpty(type)){
			type="0";
		}
		paraMap.put("type", type);
		try {
			List<WordPic>  wordPicList = materialService.getWordPicList(paraMap);
			
			returnItem.setNews_item(wordPicList);
			request.setCharacterEncoding("UTF-8");
			response.setContentType("text/xml;charset=utf-8"); 
			JsonUtil.outputJson(returnItem, response);
		} catch (Exception e) {

			e.printStackTrace();
			throw new RuntimeException(e);
		}
		
		

		return null;
	}
	
	@RequestMapping(params = "method=updatedong")
	public ModelAndView updatedong(HttpServletRequest request, HttpServletResponse response) throws UnsupportedEncodingException {
		request.setCharacterEncoding("utf-8");
		response.setContentType("text/xml;charset=utf-8");
		String media_id = request.getParameter("media_id");
		try {
			materialService.synchroMaterialWoldPic(media_id);
			
		} catch (Exception e) {

			e.printStackTrace();
			throw new RuntimeException(e);
		}
		
		

		return new ModelAndView("weixin/managedong.htm");
	}
	
	
	@RequestMapping(params = "method=insertdong")
	public ModelAndView insertdong(HttpServletRequest request, HttpServletResponse response) throws UnsupportedEncodingException {
		request.setCharacterEncoding("utf-8");
		response.setContentType("text/xml;charset=utf-8");
		String url = request.getParameter("url");
		String type = request.getParameter("type");
		Map<String, String> para = new HashMap<String, String>();
		para.put("url", url);
		para.put("type", type);
		try {
			materialService.insertMaterialWoldPic(para);
			
		} catch (Exception e) {

			e.printStackTrace();
			throw new RuntimeException(e);
		}
		
		

		return new ModelAndView("weixin/managedong.htm");
	}
	
	
	

}
