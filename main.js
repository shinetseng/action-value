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

    function generateAnalysis(zodiacSign, chineseZodiac, timePeriod) {
        const strengths = {
            past5: "過去五年您經歷了重要的成長期",
            present1: "當前是展現能力的最佳時機",
            future5: "未來五年將迎來事業高峰"
        };
        
        return `根據您的星座${zodiacSign}和生肖${chineseZodiac}分析：
            在${timePeriod}期間：${strengths[timePeriod] || ''}
            建議：
            1. 多關注個人發展
            2. 把握重要機遇
            3. 注意健康管理`;
    }

    function displayReport(report) {
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
                <h3>綜合建議</h3>
                <p>${report.analysis}</p>
            </div>
        `;
        reportContent.innerHTML = reportHtml;
    }
});
