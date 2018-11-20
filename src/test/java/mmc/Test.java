package mmc;

import java.math.BigDecimal;
import java.text.NumberFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.TreeMap;

public class Test {
	
	@org.junit.Test
	public void ggg(){
		BigDecimal b1 = new BigDecimal(3500);
		BigDecimal b2 = new BigDecimal(5000);
		BigDecimal res = b1.divide(b2);
		NumberFormat percent = NumberFormat.getPercentInstance();
		percent.setMaximumFractionDigits(2);
		//format的参数是doubel类型，需要拆箱
		System.out.println(percent.format(res.doubleValue()));
	}
	
	@org.junit.Test
	public void qas(){
		SimpleDateFormat sf = new SimpleDateFormat("yyyy");
		Date d = new Date();
		String year = sf.format(d);
		System.out.println(year);
	}
	
	@org.junit.Test
	public void aaa(){
		
		Map<Integer, String> map = new TreeMap<Integer, String>(
                new Comparator<Integer>() {
                    public int compare(Integer obj1, Integer obj2) {
                        // 降序排序
                        return obj2.compareTo(obj1);
                    }
                });
		map.put(1248, "宝马");
		map.put(394, "奥迪");
		map.put(654, "菲克兹");
		 Set<Integer> keySet = map.keySet();
	        Iterator<Integer> iter = keySet.iterator();
	        while (iter.hasNext()) {
	            Integer key = iter.next();
	            System.out.println(key + ":" + map.get(key));
	        }
	}
	@org.junit.Test
	public void psda(){
		List<Integer> i = new ArrayList<Integer>();
		i.add(12);
		i.add(1213);
		i.add(523);
		System.out.println(i.get(1));
	}
}
