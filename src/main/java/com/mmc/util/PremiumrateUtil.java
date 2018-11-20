package com.mmc.util;

import org.junit.Test;

public class PremiumrateUtil {

	
	public static double getPremiumrate(Long price,Long originalPrice,Long mileage,Integer year){
		if(originalPrice>price){
			//  现价  原价   里程   年限  
			Double mileagePrice = originalPrice*(mileage*0.05/50000);
			Double yearPrice = originalPrice*(year*0.06);
			Double shouldBePrice = (originalPrice-mileagePrice-yearPrice)>500?(originalPrice-mileagePrice-yearPrice):500;
			Double premiumrate = (shouldBePrice/price/2.0)>2?2:(shouldBePrice/price/2.0);
			return premiumrate;
		}else{
			return 0;
		}
		
	}
	

	
	
	
}
