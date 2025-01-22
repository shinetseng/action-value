   document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('query-form');
    const resultSection = document.getElementById('result');
    const reportContent = document.getElementById('report-content');

    // 日期選擇器邏輯
    const birthYear = document.getElementById('birth-year');
    const birthMonth = document.getElementById('birth-month');
    const birthDay = document.getElementById('birth-day');

    // 更新日期選項
    function updateDays() {
        const year = parseInt(birthYear.value);
        const month = parseInt(birthMonth.value);
        
        if (isNaN(year) || isNaN(month)) return;
        
        const daysInMonth = new Date(year, month, 0).getDate();
        
        // 清空現有選項
        birthDay.innerHTML = '<option value="">日</option>';
        
        // 添加新的日期選項
        for (let day = 1; day <= daysInMonth; day++) {
            const option = document.createElement('option');
            option.value = day;
            option.textContent = day + '日';
            birthDay.appendChild(option);
        }
        
        // 自動選擇第一個日期
        if (daysInMonth > 0) {
            birthDay.value = '1';
        }
    }

    // 監聽日期選擇器變化
    birthYear.addEventListener('change', updateDays);
    birthMonth.addEventListener('change', updateDays);

    // 初始化日期選擇器
    const today = new Date();
    birthYear.value = today.getFullYear();
    birthMonth.value = today.getMonth() + 1;
    updateDays();

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const calendarType = document.querySelector('input[name="calendarType"]:checked').value;
        const year = birthYear.value;
        const month = birthMonth.value.padStart(2, '0');
        const day = birthDay.value.padStart(2, '0');
        const country = document.getElementById('country').value;
        const city = document.getElementById('city').value;
        const question = document.getElementById('question').value;
        const timePeriod = document.getElementById('time-period').value;

        // 顯示載入狀態
        reportContent.innerHTML = '<p>分析中，請稍候...</p>';
        resultSection.classList.remove('hidden');

        // 模擬分析結果
        setTimeout(() => {
            const zodiacSign = getZodiacSign(new Date(year, month - 1, day));
            const chineseZodiac = getChineseZodiac(year);
            
            const report = {
                zodiacSign: zodiacSign,
                chineseZodiac: chineseZodiac,
                analysis: generateAnalysis(zodiacSign, chineseZodiac, timePeriod)
            };
            
            displayReport(report);
        }, 1000);
    });

    function getZodiacSign(date) {
        const zodiacDates = [
            [1, 20, "水瓶座"], [2, 19, "雙魚座"],
            [3, 21, "白羊座"], [4, 20, "金牛座"],
            [5, 21, "雙子座"], [6, 21, "巨蟹座"],
            [7, 23, "獅子座"], [8, 23, "處女座"],
            [9, 23, "天秤座"], [10, 23, "天蠍座"],
            [11, 22, "射手座"], [12, 22, "摩羯座"]
        ];
        
        for (const [month, day, sign] of zodiacDates) {
            if ((date.getMonth() + 1 === month && date.getDate() >= day) ||
                (date.getMonth() + 1 === month + 1 && date.getDate() < day)) {
                return sign;
            }
        }
        return "摩羯座";
    }

    function getChineseZodiac(year) {
        const zodiacs = ["鼠", "牛", "虎", "兔", "龍", "蛇", 
                        "馬", "羊", "猴", "雞", "狗", "豬"];
        return zodiacs[(year - 1900) % 12];
    }

function generateAnalysis(zodiacSign, chineseZodiac, timePeriod, question) {
    // 星座分析
    const zodiacAnalysis = {
        career: {
            past5: "過去五年您在事業上經歷了重要轉折...",
            present1: "當前是展現專業能力的最佳時機...",
            future5: "未來五年將迎來事業高峰..."
        },
        relationship: {
            past5: "過去五年感情經歷豐富...",
            present1: "當前感情狀態穩定...",
            future5: "未來五年有望遇到正緣..."
        },
        health: {
            past5: "過去五年健康狀況良好...",
            present1: "當前需要注意作息規律...",
            future5: "未來五年需特別關注心血管健康..."
        },
        education: {
            past5: "過去五年學習能力提升...",
            present1: "當前是學習新技能的黃金時期...",
            future5: "未來五年學業運勢旺盛..."
        }
    };

    // 紫微斗數分析
    const ziweiAnalysis = {
        career: "命宮顯示事業運勢上升，建議把握下半年機會...",
        relationship: "夫妻宮顯示感情穩定，單身者有望遇到正緣...",
        health: "疾厄宮顯示健康狀況良好，但需注意腸胃問題...",
        education: "官祿宮顯示學業運勢旺盛，適合進修深造..."
    };

    // 八字分析
    const baziAnalysis = {
        career: "八字顯示事業運勢強勁，適合創業或轉職...",
        relationship: "八字顯示感情運勢平穩，建議多參加社交活動...",
        health: "八字顯示健康狀況良好，但需注意肝火旺盛...",
        education: "八字顯示學業運勢佳，適合考取專業證照..."
    };

    // 易經卦象
    const ichingAnalysis = {
        career: "得到'乾卦'，象徵自強不息，宜積極進取...",
        relationship: "得到'咸卦'，象徵感情和諧，宜主動表達...",
        health: "得到'頤卦'，象徵養生之道，宜注意飲食...",
        education: "得到'蒙卦'，象徵啟蒙學習，宜專注精進..."
    };

    // 時間段詳細分析
    const timeAnalysis = {
        past5: "2020-2024年運勢回顧：\n" +
               "2020年：事業起步，感情穩定\n" +
               "2021年：學業進步，健康良好\n" +
               "2022年：事業突破，感情升溫\n" +
               "2023年：財運提升，健康注意\n" +
               "2024年：事業高峰，感情穩定",
        present1: "當前每月運勢：\n" +
                  "1月：事業機會多\n" +
                  "2月：感情運勢佳\n" +
                  "3月：健康需注意\n" +
                  "...",
        future5: "未來五年運勢預測：\n" +
                 "2025年：事業突破\n" +
                 "2026年：感情穩定\n" +
                 "2027年：健康良好\n" +
                 "..."
    };

    return `
        星座分析：${zodiacAnalysis[question][timePeriod]}
        紫微斗數：${ziweiAnalysis[question]}
        八字分析：${baziAnalysis[question]}
        易經卦象：${ichingAnalysis[question]}
        時間段分析：${timeAnalysis[timePeriod]}
        綜合建議：
        1. 多關注個人發展
        2. 把握重要機遇
        3. 注意健康管理
        4. 根據五行調整生活環境
    `;
}

    function displayReport(report) {
        const wuxingAdvice = `
            <div class="wuxing-section">
                <h4>五行調整建議</h4>
                <ul>
                    <li>幸運顏色：藍色、綠色</li>
                    <li>有利方位：東方、東南方</li>
                    <li>適合配飾：木質飾品</li>
                    <li>建議活動：園藝、散步</li>
                    <li>飲食建議：多食用綠色蔬菜</li>
                </ul>
            </div>
        `;

        const reportHtml = `
            <div class="report-section">
                <h3>星座分析</h3>
                <p>${report.zodiacSign}</p>
            </div>
            <div class="report-section">
                <h3>生肖分析</h3>
                <p>${report.chineseZodiac}</p>
            </div>
            <div class="report-section">
                <h3>詳細分析</h3>
                <p>${report.analysis}</p>
            </div>
            <div class="report-section">
                <h3>綜合建議</h3>
                <p>${report.analysis}</p>
                ${wuxingAdvice}
            </div>
        `;
        reportContent.innerHTML = reportHtml;
    }
});
