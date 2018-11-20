package com.mmc.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mmc.mapper.AnalyzerMapper;
import com.mmc.service.AnalyzerService;
import com.mmc.util.CookieUtils;
import com.mmc.util.RedisService;
import com.mmc.util.SysResult;

@RestController
public class AnalyzerController {
	@Autowired
	private AnalyzerService analyzerService;
	@Autowired
	private RedisService redis;
	public static final ObjectMapper mapper = new ObjectMapper();
	
	//二手车地区分布
	@RequestMapping("data/analyze/city")
	public SysResult getByCity0(){
		SysResult result = analyzerService.getByCity0();
		return result;
	}
	
	//二手车品牌统计      暂不写！！！！！
	@RequestMapping("data/analyze/brand")
	public SysResult getByBrand0(){
		SysResult result = analyzerService.getByBrand0();
		return result;
	}
	
	
	//二手车品牌平均保值率
	@RequestMapping("data/analyze/hedge")
	public SysResult getPremiumRateByModel0(){
		SysResult result = analyzerService.getPremiumRateByModel0();
		return result;
	}
	
	//二手车里程数-数量映射
	@RequestMapping("data/analyze/mileage")
	public SysResult getMileage(){
		SysResult result = analyzerService.getMileage();
		return result;
	}
	
	//年份数量统计
	@RequestMapping("data/analyze/year")
	public SysResult getRunByYear0(){
		SysResult result = analyzerService.getRunByYear0();
		return result;
	}
	
	//某地区品牌数量统计
	@RequestMapping("data/analyze/mapmodal1/{provinceName}")
	public SysResult getBrandNumByArea(@PathVariable String provinceName){
		SysResult result = analyzerService.getBrandNumByArea(provinceName);
		return result;
	}
	
	//某里程下品牌的数量统计
	@RequestMapping("data/analyze/mapmodal2/{mileage}")
	public SysResult getBrandNumByMileage(@PathVariable Integer mileage){
		SysResult result = analyzerService.getBrandNumByMileage(mileage);
		return result;
	}
	
	//某品牌下的地区排行
	@RequestMapping("data/analyze/mapmodal3/{brandName}")
	public SysResult getAreaOrederByBrand(@PathVariable String brandName){
		SysResult result = analyzerService.getAreaOrederByBrand(brandName);
		return result;
	}
	
	
	//根据地区名和品牌名获取list集合
	@RequestMapping("data/analyze/city/brand/{cityName}/{brandName}")
	public SysResult getCarList(@PathVariable String cityName,@PathVariable String brandName){
		SysResult result = analyzerService.getCarList(cityName,brandName);
		return result;
	}
	
	
}
