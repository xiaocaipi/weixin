package com.weixin;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.commons.io.FileUtils;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import com.weixin.util.NetUtil;
import com.weixin.util.WeiXinCommon;

import weixin.popular.api.MaterialAPI;
import weixin.popular.api.MediaAPI;
import weixin.popular.api.TokenAPI;
import weixin.popular.bean.media.Media;
import weixin.popular.bean.media.MediaType;
import weixin.popular.bean.media.UploadimgResult;
import weixin.popular.bean.message.Article;
import weixin.popular.bean.token.Token;

public class app {
	
	public static void main(String[] args) throws Exception {
//		Token token = TokenAPI.token("wx436dfcb8a1a76be0","d76669edcde1bd6845c76d7dcedb1899");
//		System.out.println(token.getAccess_token()+"---"+token.getExpires_in());
//		String access_token = token.getAccess_token();
		
//		List<Article> articles = new ArrayList<Article>();
//		Article article = new Article();
//		article.setAuthor("menu");
//		article.setContent("this is a new day ");
////		article.setThumb_media_id("1");
//		article.setTitle("first");
//		articles.add(article);
//		
//		Media media = MaterialAPI.materialAdd_news(token.getAccess_token(),articles );
//		System.out.println(media.getMedia_id());
		
//		File file = new File("/app/soft/180.jpg");
//		UploadimgResult result = MediaAPI.mediaUploadimg(access_token, file);
//		result.get
		
//		Media media = MaterialAPI.materialAdd_material(access_token, MediaType.image, file, null);
//		System.out.println(media.getMedia_id());
//		testFetchWeixin();
//		testMoveAd();
		
//		testFetchFirstPic();
		
		String tmp = "有所关注雷洋的舆论无一例外明明白白在问“怎么死”的真相，令人诧异的是，北京警方却在费尽心机告诉你雷洋“怎么嫖”的真相。幸运的是，皆因事发太突然，警方来不及运筹帷幄，因此，警方一直都没有否认雷洋是死在他们执法的路上，否则，雷洋也许就死在戴套打飞机的床上。皇帝新装的故事家喻户晓，但这个故事在中国人眼里仅仅是讽喻皇帝的昏庸和百官的奸诈虚伪，其实这是对安徒生创作意图的误读，连三岁小孩都能看出皇帝没穿衣服，你说皇帝还不知道自己没穿衣服么？皇帝一点也不昏庸，他并不怕人们知道真相，他要的就是百官众臣心生恐惧的臣服。泯灭人性的任性如果没有丧失人性的矫情配合，皇帝一天也坐不稳，当然百官也就失去荣华富贵。因此，安徒生设计童言无忌的情节，目的就是为了唤醒人性的力量和勇气，敢于对一切丧失人性的野蛮说不，才能换来没有恐惧和谎言的自由生活，否则，即便给你真相又何妨？其实，警方掩盖雷洋死亡的真相也如同皇帝的新装，他们之所以肆意任性地用漏洞百出的谎言掩盖真相，其强大动力就源自他们根本就不在乎你知道真相。这就是最能代表国家意志的公权力所表现出泯灭人性的傲慢和骄横。事实上，雷洋之死是死在警方的手上，无关雷洋是否嫖娼，也无关雷洋是否反抗，警方的执法程序都必须对雷洋的死亡程序负全责。只有先厘清程序责任前提下，再去追究环节责任的真相才有最后正义的弘扬。警方在案情通报中清清楚楚告知：“雷洋离开洗脚房之后上去盘查”。仅就这一点足够了，足够证明昌平警方执法程序的非法。无论从法理法例，还是从法规法链，在没有任何事实证据前提下去盘查一个合法公民，都是侵犯公民人身自由的非法行为，尤其是知法执法的警员更要率先力行保护公民的正当人身自由权。相反，他们却知法犯法地非法盘查一个匆匆而行的雷洋，非法的执法程序是启动雷洋死亡程序的原罪，这与雷洋在医学意义上具体因何而死无关（作者微信yutanfeiytf）。仅凭执法程序的非法，昌平警方现在应该是被依法问责的直接嫌疑机构，就不再有任何权利参与雷洋死亡调查，更没有权利还在搞什么案情通报和嫖娼证据补遗的把戏，搞了也是非法更是无效。成立独立第三方审查机构是调查雷洋死亡的唯一正义程序，这一点笔者非常赞同陈有西律师和朱征夫代表的看法。雷洋死亡案是一个根本无须懂法只须尚存人性常识的人就能自觉履行正义程序的案情，但在这国这地，即便是离祖国心脏最近的皇城根儿脚下，相关部门也不知道该咋办？但如果你真的以为他们“不知道”该咋办，那就又上当了，他们要的就是他们我们你们都知道该咋办但就不咋办而且你还不能把他们咋办的效果，他们的目的就是为了有效遏制人性的泛滥，从而始终如一地保持党性的威慑力，进而为曾经无数类似雷洋的死亡和将来类似雷洋的死亡铺筑好国民恐惧感。只要你恐惧就对了，他们怕就怕的是国民都不怕他们了。这与皇帝新装的故事有何异同？问题又出在哪里？问题出在当孩子叫出皇帝没穿衣服时，皇帝和百官众臣乃至人民群众都不愿服从人性的召唤，全都在死守自己既得的苟安，并且还要集体合谋扼杀孩子的自然人性，以便维护自己所谓来之不易的美好生活。孩子毕竟是孩子，再多的孩子叫喊与一个孩子的叫喊没有任何力量差别。事实上，今天就雷洋大声呼吁真相的人尽管很多很多，但他们实质上就是一群孩子的呼叫，根本形不成对这种野蛮说不的国家力量。请问，满朝文武达官贵人有谁出来拍案而起？人大政协有几个代表或委员出来吼一吼？平时粉丝如云的大款大腕大咖有谁出来哼一哼？文化名流、演艺明星和公共达人哪一个站出来吱吱声？此时最需要他们出来扛起社会担当和国家文明，但几乎一个也没有。恐惧是因为害怕失去，难道他们站出来就会被凌迟诛门？在任何信息都能秒传全球每一个角落的今天，无论多任性的野蛮在世界正义力量怒目包围下真还得掂量掂量自己的肆意妄为，因此，不敢站出来的原因只有一个：泯灭自己的人性去助长野蛮的任性。原先我总搞不懂西方人说“中国人没有信仰”是啥意思，其实就是指对人性的呼唤没有恻隐之心，保持人性就是一种最低境界的信仰。我特么鄙视像莫言陈凯歌之流备受景仰的社会名流，他们宁愿在大会堂酣睡如雷也不愿借此机会对野蛮说半个不字，如果让他们在240年前去费城开90多天的制宪会议，他们不带上席梦思都会扛上钢丝床还要外加速效救心丸。";
		
//		tmp="有所关注雷洋的舆论无一";
		System.out.println(getDigest(tmp));
		
	}
	
	
	private static String getDigest(String text){
		String returnText = "";
		int start =0;
		int end = 0;
		int len = text.length();
		
		if(len>108){
			start =len/2;
			end = start+54;
		}else if(len >54 && 54 <108){
			start = 54;
			end = len-1 ;
		}else {
			start =0;;
			end = len -1;
		}
		
		
		
		returnText = text.substring(start,end);
		return returnText;
	}
	
	
	
	
	public static void testFetchWeixin() throws Exception{
		
		HashMap<String, Object> paraMap = new HashMap<String, Object>();
		String url = "http://mp.weixin.qq.com/s?__biz=MzAwODEzMjY2MA==&mid=2656627379&idx=1&sn=a0076b593d6a90e2578de93b3271ca3b&scene=1&srcid=0509bMbM5CkF2RZVV56deaLR#rd";
		Document doc = null;
		doc = NetUtil.goFetch(url, doc, paraMap);
		Element element = doc.select("#js_content").get(0);
		String content = element.toString();
		File file = new File("/tmp/test15.txt");
		String title = doc.select("#activity-name").get(0).text();
		System.out.println(title);
		FileUtils.writeStringToFile(file, content, "utf-8");
		
		
		
	}
	
	
	public static void testFetchFirstPic() throws Exception{
		String url = "http://mp.weixin.qq.com/s?__biz=MzAwODEzMjY2MA==&mid=2656627379&idx=1&sn=a0076b593d6a90e2578de93b3271ca3b&scene=1&srcid=0509bMbM5CkF2RZVV56deaLR#rd";
		Document doc = null;
		HashMap<String, Object> paraMap = new HashMap<String, Object>();
		doc = NetUtil.goFetch(url, doc, paraMap);
		Element element = doc.select("#js_content").get(0);
		////先去封面找
		if(doc.select("#media").size()>0){
			String pic = doc.select("#media").get(0).toString();
			String picUrl = WeiXinCommon.getRegexContent(pic, "\"http(.+?)\"").replace("\"", "");
			WeiXinCommon.downloadPicture(picUrl,"123","/tmp/" );
			
		}else{//用第一张图片
			Elements elements = element.getElementsByTag("img");
			if(elements.size()>0){
				for(int i = 0;i<elements.size();i++){
					String elementString = elements.get(i).toString();
					String lengthString = WeiXinCommon.getRegexContent(elementString, "data-w=\"(.+?)\"");
					lengthString = lengthString.replace("data-w=\"", "").replace("\"", "");
					int len = Integer.parseInt(lengthString);
					if(len>200){
						String picUrl = WeiXinCommon.getRegexContent(elementString, "\"http(.+?)\"").replace("\"", "");
						WeiXinCommon.downloadPicture(picUrl,"123","/tmp/" );
						break;
					}
				}
				
			}
			//用默认图片
			else{
				
			}
		}
		
	}
	
	public static void testMoveAd() throws IOException{
		File file = new File("/tmp/test15.txt");
		
		String content = FileUtils.readFileToString(file, "utf-8");
		
		filterWord(content);
		
	}
	
	private static String filterWord(String content){
		
//		 content = filterWordByTag(content, "p");
		 content = filterWordByTag(content, "section");
		 System.out.println(content);
		 return content;
	}
	
	private static String filterWordByTag(String content,String tagName){

		Document doc = Jsoup.parse(content);
		 String filterword = "公众号,公号,微信号,点击,订阅";
		Elements elements = doc.getElementsByTag(tagName);
		for(int i=0;i<elements.size();i++){
			Element element = elements.get(i);
			String elementString = element.toString().trim();
			String [] filterArray = filterword.split(",");
			boolean isContain = false;
			for(String filter:filterArray){
				if(elementString.contains(filter)){
					isContain = true;
				}
			}
			//去掉有公众号的敏感词的一段,在头尾的位置才去掉
			boolean isPosition = false;
			if(i<5 || i>elements.size()-5){
				isPosition =true;
			}
			if(isContain && isPosition){
				for(String tmp :elementString.split("\n")){
					content = content.replace(tmp.trim(), "");
				}
				
			}
			//去掉最后的图片关注
			if(i==elements.size()-1 && elementString.contains("data-src")){
			   content = content.replace(elementString, "");
			}
			
			
		}
		
		return content;
	
	}

}
