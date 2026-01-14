import { useEffect } from 'react';


export default function Dashboard() {
  useEffect(() => {
    (async () => {
      const ec: any = (await import('echarts')).default;
      const el = document.getElementById('radar')!;
      const chart = ec.init(el);
      chart.setOption({
        title: { text: '五维健康雷达图' },
        tooltip: {},
        radar: {
          indicator: [
            { name: '税务', max: 100 },
            { name: '安全', max: 100 },
            { name: '传承', max: 100 },
            { name: '隐私', max: 100 },
            { name: '合规', max: 100 },
          ],
        },
        series: [{
          type: 'radar',
          data: [
            { value: [60, 70, 55, 80, 65], name: '当前状态' },
            { value: [90, 90, 85, 95, 90], name: '理想状态' },
          ],
        }],
      });
    })();
  }, []);

  return (
    <main className="min-h-screen bg-cream text-deepblue p-8">
      <h2 className="text-2xl font-semibold mb-4">诊断看板</h2>
      <div id="radar" style={{ width: '100%', height: 360 }} className="bg-white border border-copper rounded mb-6" />
      <div className="bg-white border border-copper rounded p-4 mb-4">
        <h3 className="font-semibold mb-2">风险红绿灯（示意）</h3>
        <ul className="list-disc ml-5">
          <li className="text-red-600">美国遗产税暴露（示意）</li>
          <li className="text-yellow-600">英国 Non-Dom 时间轴临界点（示意）</li>
          <li className="text-green-600">新加坡 Section 90 防火墙（示意）</li>
        </ul>
      </div>
      <a href="/report/preview" className="px-6 py-3 rounded bg-gray-400 text-white mr-3 cursor-not-allowed">预览报告（占位）</a>
      <a href="#" className="px-6 py-3 rounded bg-copper text-white">进入损益模拟（占位）</a>
    </main>
  );
}
