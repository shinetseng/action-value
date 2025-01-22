from flask import Flask, render_template, request, jsonify

app = Flask(__name__, static_url_path='/static')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/report', methods=['POST'])
def generate_report():
    data = request.get_json()
    calendar_type = data["calendarType"]
    birthdate = data["birthdate"]
    country = data["country"]
    city = data["city"]
    question = data["question"]
    time_period = data["timePeriod"]
    
    # 將出生日期轉換為命理分析所需格式
    from datetime import datetime
    birthdate_obj = datetime.strptime(birthdate, "%Y-%m-%d")
    
    # 模擬命理計算結果
    # 根據出生日期生成命理分析
    # 根據日曆類型處理日期
    if calendar_type == "lunar":
        # 農曆轉國曆邏輯（需要實現）
        pass
        
    zodiac_sign = get_zodiac_sign(birthdate_obj)
    chinese_zodiac = get_chinese_zodiac(birthdate_obj.year)
    
    # 根據出生地調整分析
    location_factor = f"{country} {city}"
    
    # 生成四項命理分析報告
    report = {
        "星座分析": generate_zodiac_report(zodiac_sign, time_period, location_factor),
        "紫微斗數": generate_ziwei_report(birthdate_obj, time_period, location_factor),
        "八字分析": generate_bazi_report(birthdate_obj, time_period, location_factor),
        "易經卦象": generate_iching_report(birthdate_obj, time_period, location_factor),
        "綜合建議": f"""
            根據您的星座{zodiac_sign}和生肖{chinese_zodiac}分析：
            1. {generate_zodiac_report(zodiac_sign, time_period)}
            2. 紫微斗數顯示：{generate_ziwei_report(birthdate_obj, time_period)}
            3. 八字命盤分析：{generate_bazi_report(birthdate_obj, time_period)}
            4. 易經卦象建議：{generate_iching_report(birthdate_obj, time_period)}
            針對 {question}，建議在{time_period}期間：
            - 多關注個人發展
            - 把握重要機遇
            - 注意健康管理
        """
    }
    return jsonify(report)

def get_zodiac_sign(date):
    # 計算星座
    zodiac_dates = [
        (1, 20, "水瓶座"), (2, 19, "雙魚座"),
        (3, 21, "白羊座"), (4, 20, "金牛座"),
        (5, 21, "雙子座"), (6, 21, "巨蟹座"),
        (7, 23, "獅子座"), (8, 23, "處女座"),
        (9, 23, "天秤座"), (10, 23, "天蠍座"),
        (11, 22, "射手座"), (12, 22, "摩羯座")
    ]
    
    for month, day, sign in zodiac_dates:
        if (date.month == month and date.day >= day) or \
           (date.month == month + 1 and date.day < day):
            return sign
    return "摩羯座"

def get_chinese_zodiac(year):
    # 計算生肖
    zodiacs = ["鼠", "牛", "虎", "兔", "龍", "蛇", 
              "馬", "羊", "猴", "雞", "狗", "豬"]
    return zodiacs[(year - 1900) % 12]

def generate_zodiac_report(sign, period, location):
    # 星座分析
    strengths = {
        "past5": "過去五年您經歷了重要的成長期",
        "present1": "當前是展現能力的最佳時機",
        "future5": "未來五年將迎來事業高峰"
    }
    return f"{sign}的特質在{period}期間：{strengths.get(period, '')}"

def generate_ziwei_report(birthdate, period, location):
    # 紫微斗數分析
    return "命宮顯示近期有貴人相助，事業運勢上升"

def generate_bazi_report(birthdate, period, location):
    # 八字分析
    return "八字顯示五行平衡，建議加強水元素"

def generate_iching_report(birthdate, period, location):
    # 易經卦象
    return "得到'乾卦'，象徵自強不息，宜積極進取"

if __name__ == "__main__":
    app.run(debug=True)
