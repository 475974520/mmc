package com.mmc.service;

import java.math.BigDecimal;
import java.text.NumberFormat;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mmc.mapper.AnalyzerMapper;
import com.mmc.pojo.Car;
import com.mmc.util.PremiumrateUtil;
import com.mmc.util.RedisService;
import com.mmc.util.SysResult;
import com.mmc.vo.BrandCount;
import com.mmc.vo.CityCount;
import com.mmc.vo.MileCount;
import com.mmc.vo.Premiumrate;
import com.mmc.vo.ProvinceCount;

@Service
public class AnalyzerService {
	@Autowired
	private RedisService redisService;

	public static final ObjectMapper mapper = new ObjectMapper();
	@Autowired
	private AnalyzerMapper analyzerMapper;
	//查询前20个品牌及对应的汽车数量
	public SysResult getByBrand0() {
		String key = "Brand";
		if(redisService.exists(key)){
			try{
				String json = redisService.get(key);
				return SysResult.oK(mapper.readValue(json, Object.class));

			}catch(Exception e){
				e.printStackTrace();
				return SysResult.build(201, "访问失败，请稍后再试哦!");
			}
		}else{
			try{
				//获取所有的品牌
				List<BrandCount> list = analyzerMapper.getAllBrandAndCountAndPrice();
				List<String> brandList = analyzerMapper.get20Brand();

				String[] brands = new String[20];
				int[] nums = new int[80];

				for (int i = 0; i < brandList.size(); i++) {
					brands[i] = brandList.get(i);
					for (int j = 0; j < list.size(); j++) {
						if(list.get(j).getBrand().equals(brands[i])){
							Long pri = list.get(j).getPrice();
							if(0 < pri &&  pri < 50000){
								nums[4*i] += list.get(j).getCount();
							}else if(50000 <= pri && pri < 100000){
								nums[4*i+1] += list.get(j).getCount();

							}else if(100000<= pri && pri < 200000){
								nums[4*i+2] += list.get(j).getCount();

							}else{
								nums[4*i+3] += list.get(j).getCount();

							}
						}
					}
				}
				Integer[] numbers = new Integer[80];
				for (int i = 0; i < numbers.length; i++) {
					numbers[i] = nums[i];
				}
				Object[][] obj = {brands,numbers};

				String json = mapper.writeValueAsString(obj);
				redisService.set(key, json);
				return SysResult.oK(obj);
			}catch(Exception e){
				e.printStackTrace();
				return SysResult.build(201, "访问失败，请稍后再试哦!");
			}
		}
	}



	//查询所有城市名称，获取对应的汽车数量
	public SysResult getByCity0() {
		String key = "City";
		if(redisService.exists(key)){
			try{
				String json = redisService.get(key);

				return SysResult.oK(mapper.readValue(json, Object.class));
			}catch(Exception e){
				return SysResult.build(201, "访问失败，请稍后再试哦!");
			}
		}else{
			try{
				List<ProvinceCount> list = analyzerMapper.getCountByProvince();
				Object[][] obj = new Object[2][list.size()];
				int index = 0;
				for (ProvinceCount pc: list) {
					obj[0][index] = pc.getProvince();
					obj[1][index] = pc.getCount();
					index++;
				}
				String json = mapper.writeValueAsString(obj);
				redisService.set(key, json);
				return SysResult.oK(obj);
			}catch(Exception e){
				e.printStackTrace();
				return SysResult.build(201, "访问失败，请稍后再试哦!");
			}
		}
	}



	//所有的品牌对应的性价比
	public SysResult getPremiumRateByModel0() {
		String key = "PremiumRate";
		if(redisService.exists(key)){
			try{
				String json = redisService.get(key);
				return SysResult.oK(mapper.readValue(json, Object.class));
			}catch(Exception e){
				e.printStackTrace();
				return SysResult.build(201, "访问失败，请稍后再试哦!");
			}
		}else{
			try{

				List<Premiumrate> list = analyzerMapper.getpremiumrate();
				List<String> brands = analyzerMapper.getBrand();
				String[] bras = new String[brands.size()];
				double[] drr = new double[brands.size()];
				int[] arr  = new int[brands.size()];
				for (Premiumrate premiumrate : list) {
					for(int i=0;i<brands.size();i++){
						if(premiumrate.getBrand().equals(brands.get(i))){
							double rate = PremiumrateUtil.getPremiumrate(premiumrate.getPrice(),premiumrate.getOriginalPrice(), premiumrate.getMileage(), premiumrate.getYear());
							drr[i] += rate;
							arr[i]++;
						}
					}
				}
				for(int i=0;i<drr.length;i++){
					drr[i]=new BigDecimal(drr[i]/arr[i]+"").setScale(2, BigDecimal.ROUND_HALF_UP).doubleValue();
					bras[i]=brands.get(i);
				}
				Double[] drrD = new Double[drr.length];
				
				//冒泡排序
				for(int i = 1; i < drr.length; i++){ // 控制轮数
					for(int j = 1; j <= drr.length - i; j++){ // 控制次数和下标
						if(drr[j - 1]  < drr[j]){
							double temp = drr[j - 1];
							drr[j - 1] = drr[j];
							drr[j] = temp;

							String str = bras[j-1];
							bras[j-1] = bras[j];
							bras[j] = str;
						}
					}

				}
				for (int i = 0; i < drr.length-7; i++) {
					drrD[i] = drr[i+7];
				}
				
				Object[][] obj = {bras,drrD};
				String json = mapper.writeValueAsString(obj);
				redisService.set(key, json);
				return SysResult.oK(obj);
			}catch(Exception e){
				e.printStackTrace();
				return SysResult.build(201, "访问失败，请稍后再试哦!");
			}
		}
	}



	//年份数量统计
	public SysResult getRunByYear0() {
		//1.根据年份1-16年获取每年对应的所有Car信息  (二维数组[年份][对应的品牌及数量的二维数组])
		//2.对每一年份，获取所有的品牌及其数量  (这是一个二维数组)
		String key = "Year";

		if(redisService.exists(key)){
			try{
				String json = redisService.get(key);
				return SysResult.oK(mapper.readValue(json, Object.class));
			}catch(Exception e){
				e.printStackTrace();
				return SysResult.build(201, "访问失败，请稍后再试哦!");
			}
		}else{
			try{
				String[] brands = new String[]{"大众","别克","奥迪","宝马","本田","福特","奔驰","比亚迪","长安","标致","宝骏","丰田","长城","吉利汽车","现代",
						"奔腾","北汽幻速","起亚","雪佛兰","北汽威旺","东风","日产","保时捷","广汽传祺","江淮","北汽绅宝","东南",
						"海马","Jeep","铃木","凯迪拉克"};
				int[][] obj = new int[10][31]; 

				//查询返回品牌、年份、数量
				List<BrandCount> list = analyzerMapper.getBr_Ye_Nu();
				for (BrandCount bc : list) {
					for (int i = 0; i < 10; i++) {
						if(bc.getYear() == i+1){
							for (int j = 0; j < brands.length; j++) {
								if(bc.getBrand().equals(brands[j])){
									obj[i][j] += bc.getCount();
								}
							}
						}
					}
				}
				String json = mapper.writeValueAsString(obj);
				redisService.set(key, json);
				return SysResult.oK(obj);
			}catch(Exception e){
				e.printStackTrace();
				return SysResult.build(201, "访问失败，请稍后再试哦!");
			}
		}
	}

	//待优化
	//二手车里程数-数量映射
	public SysResult getMileage() {
		String key = "Mileage";
		if(redisService.exists(key)){
			try{
				String json = redisService.get(key);
				return SysResult.oK(mapper.readValue(json, Object.class));
			}catch(Exception e){
				e.printStackTrace();
				return SysResult.build(201, "访问失败，请稍后重试哦!");
			}
		}else{
			try{
				//获取所有不重复的里程数作为数组大小
				int[][] obj = new int[2][40];
				//查询到所有的里程数及其数量
				List<MileCount> mileList = analyzerMapper.getAllMile();
				for (MileCount mileCount : mileList) {
					int mile = (int)(mileCount.getMileage() / 10000);
					if(mile < 40){
						obj[1][mile]+= mileCount.getCount();
					}
				}
				for (int i = 1; i <= 40 ; i++) {
					obj[0][i-1] = i;
				}
				String json = mapper.writeValueAsString(obj);
				redisService.set(key, json);
				return SysResult.oK(obj);
			}catch(Exception e){
				e.printStackTrace();
				return SysResult.build(201, "访问失败，请稍后重试哦!");
			}
		}
	}


	//某地区品牌数量统计
	public SysResult getBrandNumByArea(String provinceName) {
		String key = provinceName;
		if(redisService.exists(key)){
			try{
				String json = redisService.get(key);
				return SysResult.oK(mapper.readValue(json, Object.class));
			}catch(Exception e){
				return SysResult.build(201, "访问失败，请稍后再试哦!");
			}
		}else{
			try{
				//获取该地区品牌的数量
				Object[][] obj = new Object[2][10];
				obj[0][9] = "其他";
				//获取地区对应前9品牌的数量
				List<BrandCount> list9 = analyzerMapper.getBrandNumByArea(provinceName);
				//获取地区所有品牌的数量
				List<BrandCount> listAll = analyzerMapper.getBrandNumAllArea(provinceName);
				int index = 0;
				Integer sum = 0;
				for (BrandCount br9 : list9) {
					obj[0][index] = br9.getBrand();
					obj[1][index] = br9.getCount();
					index++;
				}
				for (int i = 9; i < listAll.size(); i++) {
					sum += listAll.get(i).getCount();
				}
				obj[1][9] = sum;
				String json = mapper.writeValueAsString(obj);
				redisService.set(key, json);
				return SysResult.oK(obj);
			}catch(Exception e){
				return SysResult.build(201, "访问失败，请稍后再试哦!");
			}
		}
	}


	//某里程下品牌的数量统计
	public SysResult getBrandNumByMileage(Integer mileage) {
		String key = mileage+"brandCount";
		if(redisService.exists(key)){
			try{
				String json = redisService.get(key);
				return SysResult.oK(mapper.readValue(json, Object.class));
			}catch(Exception e){
				return SysResult.build(201, "访问失败，请稍后再试!");
			}
		}else{
			try{
				Object[][] obj = new Object[2][21];
				obj[0][20] = "其他";
				int index = 0;
				Integer sum = 0;
				//获取品牌前9的数量
				List<BrandCount> list9 = analyzerMapper.getBrandNum9(mileage);
				//获取品牌所有的数量
				List<BrandCount> listAll = analyzerMapper.getBrandNumAll(mileage);
				for (BrandCount br9 : list9) {
					obj[0][index] = br9.getBrand();
					obj[1][index] = br9.getCount();
					index++;
				}
				for (int i = 20; i < listAll.size(); i++) {
					sum += listAll.get(i).getCount();
				}
				obj[1][20] = sum;
				String json = mapper.writeValueAsString(obj);
				redisService.set(key, json);
				return SysResult.oK(obj);
			}catch(Exception e){
				return SysResult.build(201, "访问失败，滚！");
			}
		}
	}



	public SysResult getCarList(String cityName, String brandName) {
		try{
			List<Car> list = analyzerMapper.getCarList(cityName,brandName);
			return SysResult.oK(list);
		}catch(Exception e){
			return SysResult.build(201, "访问失败");
		}
	}


	//某品牌下地区排行
	public SysResult getAreaOrederByBrand(String brandName) {
		String key = brandName+"CityOrder";
		if(redisService.exists(key)){
			try{
				String json = redisService.get(key);
				return SysResult.oK(mapper.readValue(json, Object.class));
			}catch(Exception e){
				return SysResult.build(201, "访问失败，请稍后再试");
			}
		}else{
			try{
				//获取品牌名下的地区排行
				List<CityCount> cityList = analyzerMapper.getAreaOrederByBrand(brandName);
				Object[][] obj = new Object[2][15];
				int index = 0;
				for (CityCount ct : cityList) {
					obj[0][index] = ct.getCity();
					obj[1][index] = ct.getCount();
					index++;
				}
				for (int i = 0; i < obj.length; i++) {
					for (int j = 0; j < obj[i].length; j++) {
						System.out.print(obj[i][j] + " ");
					}
					System.out.println();
				}
				String json = mapper.writeValueAsString(obj);
				redisService.set(key, json);
				return SysResult.oK(obj);
			}catch(Exception e){
				e.printStackTrace();
				return SysResult.build(201, "访问失败");
			}
		}
	}







}
