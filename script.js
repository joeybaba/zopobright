// 平滑滚动函数
function smoothScroll(target, duration = 800) {
    const targetElement = document.querySelector(target);
    if (!targetElement) return;

    const targetPosition = targetElement.offsetTop - 80; // 减去导航栏高度
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    // 缓动函数
    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}

// 导航链接点击事件处理
document.addEventListener('DOMContentLoaded', () => {
    // 处理导航链接点击
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.getAttribute('href');
            smoothScroll(target);

            // 更新活动状态
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // 处理解决方案链接点击
    const solutionLinks = document.querySelectorAll('.solution-link');
    solutionLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const card = link.closest('.subcategory-card');
            const title = card.querySelector('h4').textContent;
            const description = card.querySelector('p').textContent;

            // 创建模态框
            const modal = document.createElement('div');
            modal.className = 'solution-modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <span class="close-modal">&times;</span>
                    <h3>${title}</h3>
                    <div class="modal-description">${description}</div>
                    <div class="modal-details">
                        <h4>核心优势</h4>
                        <ul>
                            <li>高性能：采用最新一代LED芯片，实现卓越的显示效果</li>
                            <li>节能环保：低功耗设计，符合绿色节能标准</li>
                            <li>稳定可靠：严格的质量控制，确保产品长期稳定运行</li>
                            <li>智能控制：支持智能调光和场景联动</li>
                        </ul>
                        <h4>技术参数</h4>
                        <ul>
                            <li>亮度：800-1200 nits</li>
                            <li>对比度：3000:1</li>
                            <li>视角：160°(H) / 160°(V)</li>
                            <li>刷新率：3840Hz</li>
                        </ul>
                        <div class="modal-contact">
                            <p>了解更多详情，请联系我们的技术顾问</p>
                            <a href="mailto:contact@example.com" class="contact-btn">联系我们</a>
                        </div>
                    </div>
                </div>
            `;

            document.body.appendChild(modal);

            // 添加关闭按钮事件
            const closeBtn = modal.querySelector('.close-modal');
            closeBtn.addEventListener('click', () => {
                modal.remove();
            });

            // 点击模态框外部关闭
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.remove();
                }
            });
        });
    });

    // 处理产品详情按钮点击
    const detailBtns = document.querySelectorAll('.detail-btn');
    detailBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const card = btn.closest('.product-card');
            const title = card.querySelector('h3').textContent;
            const specs = Array.from(card.querySelectorAll('.spec-list li'))
                .map(li => li.textContent)
                .join('\n');

            // 创建产品详情模态框
            const modal = document.createElement('div');
            modal.className = 'product-modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <span class="close-modal">&times;</span>
                    <h3>${title}</h3>
                    <div class="modal-specs">
                        <h4>产品规格</h4>
                        <pre>${specs}</pre>
                    </div>
                    <div class="modal-details">
                        <h4>产品特点</h4>
                        <ul>
                            <li>采用先进的芯片封装技术</li>
                            <li>优异的散热性能</li>
                            <li>高可靠性设计</li>
                            <li>丰富的应用场景支持</li>
                        </ul>
                        <div class="modal-download">
                            <a href="#" class="download-btn">下载产品说明书</a>
                        </div>
                    </div>
                </div>
            `;

            document.body.appendChild(modal);

            // 添加关闭按钮事件
            const closeBtn = modal.querySelector('.close-modal');
            closeBtn.addEventListener('click', () => {
                modal.remove();
            });

            // 点击模态框外部关闭
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.remove();
                }
            });
        });
    });

    // 处理新闻链接点击
    const newsLinks = document.querySelectorAll('.news-link');
    newsLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const card = link.closest('.news-card');
            const date = card.querySelector('.news-date').textContent;
            const title = card.querySelector('h3').textContent;
            const description = card.querySelector('p').textContent;

            // 创建新闻详情模态框
            const modal = document.createElement('div');
            modal.className = 'solution-modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <span class="close-modal">&times;</span>
                    <div class="news-date">${date}</div>
                    <h3>${title}</h3>
                    <div class="modal-description">${description}</div>
                    <div class="modal-details">
                        <h4>相关资讯</h4>
                        <ul>
                            <li>行业影响：本次突破将推动整个行业技术水平的提升</li>
                            <li>未来展望：公司将继续加大研发投入，推动技术创新</li>
                            <li>市场反响：获得多家行业媒体关注报道</li>
                        </ul>
                        <div class="modal-contact">
                            <p>想了解更多详情？</p>
                            <a href="mailto:pr@zpglight.com" class="contact-btn">联系我们</a>
                        </div>
                    </div>
                </div>
            `;

            document.body.appendChild(modal);

            // 添加关闭按钮事件
            const closeBtn = modal.querySelector('.close-modal');
            closeBtn.addEventListener('click', () => {
                modal.remove();
            });

            // 点击模态框外部关闭
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.remove();
                }
            });
        });
    });

    // 处理页脚快速链接点击
    const footerLinks = document.querySelectorAll('.footer-section a, .social-link');
    footerLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const linkText = link.textContent;
            
            // 创建链接详情模态框
            const modal = document.createElement('div');
            modal.className = 'solution-modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <span class="close-modal">&times;</span>
                    <h3>${linkText}</h3>
                    <div class="modal-description">您点击了"${linkText}"链接，此功能正在建设中...</div>
                    <div class="modal-details">
                        <h4>即将推出</h4>
                        <ul>
                            <li>详细的产品资料下载</li>
                            <li>技术支持在线咨询</li>
                            <li>最新招聘信息</li>
                            <li>社交媒体互动功能</li>
                        </ul>
                        <div class="modal-contact">
                            <p>如需帮助，请直接联系我们</p>
                            <a href="mailto:info@zpglight.com" class="contact-btn">发送邮件</a>
                        </div>
                    </div>
                </div>
            `;

            document.body.appendChild(modal);

            // 添加关闭按钮事件
            const closeBtn = modal.querySelector('.close-modal');
            closeBtn.addEventListener('click', () => {
                modal.remove();
            });

            // 点击模态框外部关闭
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.remove();
                }
            });
        });
    });
    
    // 处理时间轴项点击
    const timelineItems = document.querySelectorAll('.timeline-item');

    timelineItems.forEach(item => {
        item.addEventListener('click', () => {
            const date = item.querySelector('.timeline-date').textContent;
            const title = item.querySelector('h3').textContent;
            const description = item.querySelector('p').textContent;

            // 创建时间轴详情模态框
            const modal = document.createElement('div');
            modal.className = 'solution-modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <span class="close-modal">&times;</span>
                    <div class="timeline-date">${date}</div>
                    <h3>${title}</h3>
                    <div class="modal-description">${description}</div>
                    <div class="modal-details">
                        <h4>里程碑意义</h4>
                        <ul>
                            <li>技术突破：推动公司核心技术能力提升</li>
                            <li>市场拓展：开拓新的市场机遇</li>
                            <li>品牌建设：提升企业品牌影响力</li>
                        </ul>
                        <div class="modal-contact">
                            <p>了解更多企业发展历程</p>
                            <a href="#" class="contact-btn">查看完整发展史</a>
                        </div>
                    </div>
                </div>
            `;

            document.body.appendChild(modal);

            // 添加关闭按钮事件
            const closeBtn = modal.querySelector('.close-modal');
            closeBtn.addEventListener('click', () => {
                modal.remove();
            });

            // 点击模态框外部关闭
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.remove();
                }
            });
        });
    });
});