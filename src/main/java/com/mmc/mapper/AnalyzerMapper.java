package com.mmc.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.mmc.pojo.Car;
import com.mmc.vo.BrandCount;
import com.mmc.vo.CityCount;
import com.mmc.vo.MileCount;
import com.mmc.vo.Premiumrate;
import com.mmc.vo.ProvinceCount;

public interface AnalyzerMapper{

	public List<BrandCount> getAllBrandAndCountAndPrice();
	public List<String> get20Brand();
	public Integer getNumByBrand(String brand);

//	public List<Car> getAllForCity();
	public List<ProvinceCount> getCountByProvince();
//	public Integer getNumByCity(String city);

	
//	public List<Car> getAllPremiumByModel();
	//获取所有的车系
	public List<Car> getAllModel();
	public List<Car> getAllModelByBrand(String brand);
//	public List<Car> getPremiumRateByModel(String brand,String model);
	public List<Car> getListByBr_Mo(@Param("brand") String brand, @Param("model") String model);
	
	//获取里程数
	public List<Long> getAllMileage();
//	public Integer getCarNumByMil(Integer mileage);
	public List<MileCount> getAllMile();
	
	//获取所有生产年份
//	public List<Integer> getAllYear();
//	public Integer getRunByYear(Integer year);
	
	//根据年份和品牌名称获取对应的汽车数量
	public Integer getCountByYear_Br(@Param("year") int year,@Param("brand") String brand);
	
	//根据地区名获取所有品牌
//	public List<BrandCount> getBrandByProvince(String provinceName);
	public List<BrandCount> getBrandNumByArea(String provinceName);
	public List<BrandCount> getBrandNumAllArea(String provinceName);
	
	//根据里程数获取所有品牌
//	public List<String> getBrandNumByMileage(Integer mileage);
	public List<BrandCount> getBrandNum9(Integer mileage);
	public List<BrandCount> getBrandNumAll(Integer mileage);
	
	
	
	
	public List<Car> getCarList(@Param("cityName")String cityName,@Param("brandName") String brandName);
	public List<Car> getAllForBrand();
	
	
	public List<BrandCount> getBr_Ye_Nu();
	
	//获取品牌名下的地区排行
	public List<CityCount> getAreaOrederByBrand(String brandName);
	
	
	//性价比
	public List<Premiumrate> getpremiumrate();
	public List<String> getBrand();
	
	
	
	
	

	
	
	


	
}
