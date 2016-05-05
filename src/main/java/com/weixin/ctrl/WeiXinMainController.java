package com.weixin.ctrl;

import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.multiaction.MultiActionController;

@Controller
@RequestMapping("/weixinMain")
public class WeiXinMainController extends MultiActionController {

	@RequestMapping(params = "method=saveAlert")
	public ModelAndView saveAlert(HttpServletRequest request, HttpServletResponse response) {

		HashMap<String, String> paraMap = new HashMap<String, String>();
		try {
		} catch (Exception e) {

			e.printStackTrace();
			throw new RuntimeException(e);
		}

		return new ModelAndView("weixin/welcome");
	}

}
