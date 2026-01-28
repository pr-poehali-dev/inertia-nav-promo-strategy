import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

const projectData = {
  title: 'Продвижение инновационного инерциального навигационного прибора АО «АПЗ»',
  duration: 48,
  stages: [
    {
      id: 1,
      name: 'Начальная аналитика',
      description: 'Рыночные исследования, сегментация, SWOT-анализ',
      responsible: 'Аналитик, маркетолог',
      startWeek: 1,
      endWeek: 2,
      duration: 2,
      progress: 100,
      status: 'completed',
      dependencies: [],
    },
    {
      id: 2,
      name: 'Разработка концепции',
      description: 'Проработка коммуникационной стратегии, выбор каналов',
      responsible: 'Менеджер проекта, PR',
      startWeek: 3,
      endWeek: 4,
      duration: 2,
      progress: 85,
      status: 'in-progress',
      dependencies: [1],
    },
    {
      id: 3,
      name: 'Подготовка материалов',
      description: 'Визуализация бренда, экспертные статьи, медиа-контент',
      responsible: 'SMM-специалист, дизайнер',
      startWeek: 4,
      endWeek: 6,
      duration: 3,
      progress: 45,
      status: 'in-progress',
      dependencies: [2],
    },
    {
      id: 4,
      name: 'Организация каналов',
      description: 'Договорённости с B2B-площадками, медиапартнёрами',
      responsible: 'Маркетолог, sales-менеджер',
      startWeek: 7,
      endWeek: 8,
      duration: 2,
      progress: 0,
      status: 'pending',
      dependencies: [3],
    },
    {
      id: 5,
      name: 'Пилотные проекты и демонстрации',
      description: 'Сбор обратной связи от первых заказчиков, адаптация',
      responsible: 'Инженер, sales, PR',
      startWeek: 9,
      endWeek: 15,
      duration: 7,
      progress: 0,
      status: 'pending',
      dependencies: [4],
    },
    {
      id: 6,
      name: 'Масштабирование и продвижение',
      description: 'Digital-реклама, участие в выставках, рассылки',
      responsible: 'Digital-менеджер, PR',
      startWeek: 16,
      endWeek: 40,
      duration: 25,
      progress: 0,
      status: 'pending',
      dependencies: [5],
    },
    {
      id: 7,
      name: 'Сбор обратной связи и анализ',
      description: 'Оценка KPI, финальный анализ, коррекция стратегии',
      responsible: 'Менеджер, аналитик',
      startWeek: 41,
      endWeek: 48,
      duration: 8,
      progress: 0,
      status: 'pending',
      dependencies: [6],
    },
  ],
};

const Index = () => {
  const [activeTab, setActiveTab] = useState('gantt');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return '#4CAF50';
      case 'in-progress': return '#2196F3';
      case 'pending': return '#9E9E9E';
      default: return '#9E9E9E';
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] p-8">
      <div className="max-w-[1800px] mx-auto space-y-6">
        <div className="bg-white border border-[#D0D0D0] rounded-sm shadow-sm p-6">
          <h1 className="text-2xl font-semibold text-[#2C3E50] mb-2">
            Управление проектом
          </h1>
          <p className="text-sm text-[#7F8C8D]">
            {projectData.title}
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-white border border-[#D0D0D0] p-1">
            <TabsTrigger 
              value="gantt" 
              className="data-[state=active]:bg-[#E7F3FF] data-[state=active]:text-[#0066CC]"
            >
              Диаграмма Ганта
            </TabsTrigger>
            <TabsTrigger 
              value="cpm"
              className="data-[state=active]:bg-[#E7F3FF] data-[state=active]:text-[#0066CC]"
            >
              График СРМ (Сетевой график)
            </TabsTrigger>
          </TabsList>

          {/* Диаграмма Ганта в стиле Excel */}
          <TabsContent value="gantt" className="mt-4">
            <div className="bg-white border border-[#D0D0D0] shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-[#4472C4] text-white">
                      <th className="border border-[#2C5AA0] px-3 py-2 text-left text-sm font-semibold w-8">№</th>
                      <th className="border border-[#2C5AA0] px-3 py-2 text-left text-sm font-semibold min-w-[200px]">Название задачи</th>
                      <th className="border border-[#2C5AA0] px-3 py-2 text-left text-sm font-semibold min-w-[180px]">Ответственный</th>
                      <th className="border border-[#2C5AA0] px-3 py-2 text-center text-sm font-semibold w-24">Начало</th>
                      <th className="border border-[#2C5AA0] px-3 py-2 text-center text-sm font-semibold w-24">Конец</th>
                      <th className="border border-[#2C5AA0] px-3 py-2 text-center text-sm font-semibold w-20">Длит.</th>
                      <th className="border border-[#2C5AA0] px-3 py-2 text-left text-sm font-semibold" style={{ minWidth: '800px' }}>
                        <div className="flex">
                          {Array.from({ length: 12 }, (_, i) => (
                            <div key={i} className="flex-1 text-center text-xs">
                              {i * 4 + 1}-{(i + 1) * 4}
                            </div>
                          ))}
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {projectData.stages.map((stage, idx) => {
                      const leftPercent = ((stage.startWeek - 1) / projectData.duration) * 100;
                      const widthPercent = (stage.duration / projectData.duration) * 100;
                      const isCritical = true;

                      return (
                        <tr key={stage.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-[#F9F9F9]'}>
                          <td className="border border-[#D0D0D0] px-3 py-2 text-center text-sm">{stage.id}</td>
                          <td className="border border-[#D0D0D0] px-3 py-2 text-sm">
                            <div className="font-medium">{stage.name}</div>
                            <div className="text-xs text-[#7F8C8D] mt-0.5">{stage.description}</div>
                          </td>
                          <td className="border border-[#D0D0D0] px-3 py-2 text-sm">{stage.responsible}</td>
                          <td className="border border-[#D0D0D0] px-3 py-2 text-center text-sm">нед. {stage.startWeek}</td>
                          <td className="border border-[#D0D0D0] px-3 py-2 text-center text-sm">нед. {stage.endWeek}</td>
                          <td className="border border-[#D0D0D0] px-3 py-2 text-center text-sm font-medium">{stage.duration}</td>
                          <td className="border border-[#D0D0D0] px-3 py-2 relative" style={{ minWidth: '800px' }}>
                            <div className="relative h-7">
                              <div
                                className="absolute top-1 h-5 rounded-sm flex items-center justify-center text-white text-xs font-medium"
                                style={{
                                  left: `${leftPercent}%`,
                                  width: `${widthPercent}%`,
                                  backgroundColor: getStatusColor(stage.status),
                                  border: isCritical ? '2px solid #E74C3C' : 'none',
                                }}
                              >
                                {stage.progress > 0 && `${stage.progress}%`}
                              </div>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="border-t border-[#D0D0D0] p-4 bg-[#F9F9F9]">
                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-4 rounded-sm" style={{ backgroundColor: '#4CAF50' }} />
                    <span>Завершено</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-4 rounded-sm" style={{ backgroundColor: '#2196F3' }} />
                    <span>В работе</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-4 rounded-sm" style={{ backgroundColor: '#9E9E9E' }} />
                    <span>Ожидание</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-4 rounded-sm border-2" style={{ backgroundColor: '#E74C3C', borderColor: '#E74C3C' }} />
                    <span>Критический путь</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* График СРМ (Сетевая диаграмма) */}
          <TabsContent value="cpm" className="mt-4">
            <div className="bg-white border border-[#D0D0D0] shadow-sm p-8">
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-[#2C3E50] mb-2">
                  Сетевой график (CPM - Critical Path Method)
                </h2>
                <p className="text-sm text-[#7F8C8D]">
                  Метод критического пути для определения минимальной длительности проекта
                </p>
              </div>

              <div className="relative" style={{ height: '600px' }}>
                <svg width="100%" height="100%" className="border border-[#E0E0E0] bg-[#FAFAFA]">
                  <defs>
                    <marker
                      id="arrowhead"
                      markerWidth="10"
                      markerHeight="10"
                      refX="9"
                      refY="3"
                      orient="auto"
                    >
                      <polygon points="0 0, 10 3, 0 6" fill="#E74C3C" />
                    </marker>
                  </defs>

                  {/* Узел 1 */}
                  <g transform="translate(100, 80)">
                    <rect x="-50" y="-30" width="100" height="60" fill="#4472C4" stroke="#2C5AA0" strokeWidth="2" rx="4" />
                    <text x="0" y="-5" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Этап 1</text>
                    <text x="0" y="10" textAnchor="middle" fill="white" fontSize="10">Аналитика</text>
                    <text x="0" y="25" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">2 нед.</text>
                    <circle cx="-40" cy="-20" r="12" fill="#E74C3C" stroke="white" strokeWidth="2" />
                    <text x="-40" y="-15" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">1</text>
                  </g>

                  {/* Узел 2 */}
                  <g transform="translate(320, 80)">
                    <rect x="-50" y="-30" width="100" height="60" fill="#4472C4" stroke="#2C5AA0" strokeWidth="2" rx="4" />
                    <text x="0" y="-5" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Этап 2</text>
                    <text x="0" y="10" textAnchor="middle" fill="white" fontSize="10">Концепция</text>
                    <text x="0" y="25" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">2 нед.</text>
                    <circle cx="-40" cy="-20" r="12" fill="#E74C3C" stroke="white" strokeWidth="2" />
                    <text x="-40" y="-15" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">2</text>
                  </g>

                  {/* Узел 3 */}
                  <g transform="translate(540, 80)">
                    <rect x="-50" y="-30" width="100" height="60" fill="#4472C4" stroke="#2C5AA0" strokeWidth="2" rx="4" />
                    <text x="0" y="-5" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Этап 3</text>
                    <text x="0" y="10" textAnchor="middle" fill="white" fontSize="10">Материалы</text>
                    <text x="0" y="25" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">3 нед.</text>
                    <circle cx="-40" cy="-20" r="12" fill="#E74C3C" stroke="white" strokeWidth="2" />
                    <text x="-40" y="-15" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">3</text>
                  </g>

                  {/* Узел 4 */}
                  <g transform="translate(760, 80)">
                    <rect x="-50" y="-30" width="100" height="60" fill="#4472C4" stroke="#2C5AA0" strokeWidth="2" rx="4" />
                    <text x="0" y="-5" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Этап 4</text>
                    <text x="0" y="10" textAnchor="middle" fill="white" fontSize="10">Каналы</text>
                    <text x="0" y="25" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">2 нед.</text>
                    <circle cx="-40" cy="-20" r="12" fill="#E74C3C" stroke="white" strokeWidth="2" />
                    <text x="-40" y="-15" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">4</text>
                  </g>

                  {/* Узел 5 */}
                  <g transform="translate(320, 240)">
                    <rect x="-60" y="-30" width="120" height="60" fill="#4472C4" stroke="#2C5AA0" strokeWidth="2" rx="4" />
                    <text x="0" y="-5" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Этап 5</text>
                    <text x="0" y="10" textAnchor="middle" fill="white" fontSize="10">Пилотные проекты</text>
                    <text x="0" y="25" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">7 нед.</text>
                    <circle cx="-50" cy="-20" r="12" fill="#E74C3C" stroke="white" strokeWidth="2" />
                    <text x="-50" y="-15" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">5</text>
                  </g>

                  {/* Узел 6 */}
                  <g transform="translate(540, 240)">
                    <rect x="-60" y="-30" width="120" height="60" fill="#4472C4" stroke="#2C5AA0" strokeWidth="2" rx="4" />
                    <text x="0" y="-5" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Этап 6</text>
                    <text x="0" y="10" textAnchor="middle" fill="white" fontSize="10">Масштабирование</text>
                    <text x="0" y="25" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">25 нед.</text>
                    <circle cx="-50" cy="-20" r="12" fill="#E74C3C" stroke="white" strokeWidth="2" />
                    <text x="-50" y="-15" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">6</text>
                  </g>

                  {/* Узел 7 */}
                  <g transform="translate(760, 240)">
                    <rect x="-60" y="-30" width="120" height="60" fill="#4472C4" stroke="#2C5AA0" strokeWidth="2" rx="4" />
                    <text x="0" y="-5" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Этап 7</text>
                    <text x="0" y="10" textAnchor="middle" fill="white" fontSize="10">Анализ</text>
                    <text x="0" y="25" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">8 нед.</text>
                    <circle cx="-50" cy="-20" r="12" fill="#E74C3C" stroke="white" strokeWidth="2" />
                    <text x="-50" y="-15" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">7</text>
                  </g>

                  {/* Стрелки критического пути */}
                  <line x1="150" y1="80" x2="270" y2="80" stroke="#E74C3C" strokeWidth="3" markerEnd="url(#arrowhead)" />
                  <line x1="370" y1="80" x2="490" y2="80" stroke="#E74C3C" strokeWidth="3" markerEnd="url(#arrowhead)" />
                  <line x1="590" y1="80" x2="710" y2="80" stroke="#E74C3C" strokeWidth="3" markerEnd="url(#arrowhead)" />
                  <line x1="760" y1="110" x2="380" y2="210" stroke="#E74C3C" strokeWidth="3" markerEnd="url(#arrowhead)" />
                  <line x1="380" y1="240" x2="480" y2="240" stroke="#E74C3C" strokeWidth="3" markerEnd="url(#arrowhead)" />
                  <line x1="600" y1="240" x2="700" y2="240" stroke="#E74C3C" strokeWidth="3" markerEnd="url(#arrowhead)" />
                </svg>
              </div>

              <div className="mt-6 p-4 bg-[#FFF3CD] border border-[#FFE69C] rounded-sm">
                <div className="flex items-start gap-3">
                  <Icon name="AlertTriangle" className="text-[#856404] mt-0.5" size={20} />
                  <div>
                    <h3 className="font-semibold text-[#856404] mb-1">Критический путь проекта</h3>
                    <p className="text-sm text-[#856404] mb-2">
                      <strong>Путь:</strong> Этап 1 → Этап 2 → Этап 3 → Этап 4 → Этап 5 → Этап 6 → Этап 7
                    </p>
                    <p className="text-sm text-[#856404]">
                      <strong>Общая длительность:</strong> 2 + 2 + 3 + 2 + 7 + 25 + 8 = <strong>49 недель</strong>
                    </p>
                    <p className="text-xs text-[#856404] mt-2">
                      ⚠️ Все этапы находятся на критическом пути. Задержка любого этапа приведёт к сдвигу завершения проекта.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="p-4 bg-[#F9F9F9] border border-[#D0D0D0] rounded-sm">
                  <h4 className="font-semibold text-[#2C3E50] mb-2 text-sm">Ранние сроки начала</h4>
                  <div className="space-y-1 text-xs">
                    <div>Этап 1: неделя 1 (ES = 0)</div>
                    <div>Этап 2: неделя 3 (ES = 2)</div>
                    <div>Этап 3: неделя 5 (ES = 4)</div>
                    <div>Этап 4: неделя 8 (ES = 7)</div>
                    <div>Этап 5: неделя 10 (ES = 9)</div>
                    <div>Этап 6: неделя 17 (ES = 16)</div>
                    <div>Этап 7: неделя 42 (ES = 41)</div>
                  </div>
                </div>

                <div className="p-4 bg-[#F9F9F9] border border-[#D0D0D0] rounded-sm">
                  <h4 className="font-semibold text-[#2C3E50] mb-2 text-sm">Поздние сроки окончания</h4>
                  <div className="space-y-1 text-xs">
                    <div>Этап 1: неделя 2 (LF = 2, резерв = 0)</div>
                    <div>Этап 2: неделя 4 (LF = 4, резерв = 0)</div>
                    <div>Этап 3: неделя 7 (LF = 7, резерв = 0)</div>
                    <div>Этап 4: неделя 9 (LF = 9, резерв = 0)</div>
                    <div>Этап 5: неделя 16 (LF = 16, резерв = 0)</div>
                    <div>Этап 6: неделя 41 (LF = 41, резерв = 0)</div>
                    <div>Этап 7: неделя 49 (LF = 49, резерв = 0)</div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
