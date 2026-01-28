import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

// Данные проекта
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
      metrics: { reach: 0, impressions: 0, contacts: 0 },
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
      metrics: { reach: 0, impressions: 0, contacts: 0 },
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
      metrics: { reach: 0, impressions: 0, contacts: 0 },
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
      metrics: { reach: 0, impressions: 0, contacts: 0 },
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
      metrics: { reach: 2500, impressions: 8500, contacts: 150 },
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
      metrics: { reach: 45000, impressions: 320000, contacts: 3200 },
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
      metrics: { reach: 5000, impressions: 12000, contacts: 450 },
    },
  ],
};

// Расчёт критического пути
const calculateCriticalPath = () => {
  const stages = projectData.stages;
  const criticalPath: number[] = [];
  
  // Критический путь = последовательность задач без временного резерва
  // В данном случае все этапы последовательны
  stages.forEach(stage => {
    if (stage.dependencies.length > 0 || stage.id === 1) {
      criticalPath.push(stage.id);
    }
  });
  
  return criticalPath;
};

const Index = () => {
  const [selectedStage, setSelectedStage] = useState<number | null>(null);
  const criticalPath = calculateCriticalPath();
  
  const totalProgress = Math.round(
    projectData.stages.reduce((sum, stage) => sum + stage.progress, 0) / projectData.stages.length
  );
  
  const completedStages = projectData.stages.filter(s => s.status === 'completed').length;
  const inProgressStages = projectData.stages.filter(s => s.status === 'in-progress').length;
  
  const totalMetrics = projectData.stages.reduce(
    (acc, stage) => ({
      reach: acc.reach + stage.metrics.reach,
      impressions: acc.impressions + stage.metrics.impressions,
      contacts: acc.contacts + stage.metrics.contacts,
    }),
    { reach: 0, impressions: 0, contacts: 0 }
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'in-progress': return 'bg-blue-500';
      case 'pending': return 'bg-gray-300';
      default: return 'bg-gray-300';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed': return <Badge className="bg-green-500">Завершён</Badge>;
      case 'in-progress': return <Badge className="bg-blue-500">В работе</Badge>;
      case 'pending': return <Badge variant="outline">Ожидание</Badge>;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-[1600px] mx-auto space-y-6">
        {/* Шапка */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-secondary mb-2">
              Панель управления проектом
            </h1>
            <p className="text-muted-foreground max-w-3xl">
              {projectData.title}
            </p>
          </div>
          <Badge variant="outline" className="text-lg px-4 py-2">
            <Icon name="Calendar" className="mr-2" size={20} />
            48 недель
          </Badge>
        </div>

        {/* Основные метрики */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Общий прогресс
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-secondary mb-2">{totalProgress}%</div>
              <Progress value={totalProgress} className="h-2" />
              <p className="text-xs text-muted-foreground mt-2">
                {completedStages} из {projectData.stages.length} этапов завершено
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Охват аудитории
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary mb-2">
                {totalMetrics.reach.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">Уникальных пользователей</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Impressions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary mb-2">
                {totalMetrics.impressions.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">Показов рекламы</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Контакты
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary mb-2">
                {totalMetrics.contacts.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">Лидов получено</p>
            </CardContent>
          </Card>
        </div>

        {/* Табы */}
        <Tabs defaultValue="gantt" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="gantt">Диаграмма Ганта</TabsTrigger>
            <TabsTrigger value="critical">Критический путь</TabsTrigger>
            <TabsTrigger value="stages">Этапы</TabsTrigger>
          </TabsList>

          {/* Диаграмма Ганта */}
          <TabsContent value="gantt" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Диаграмма Ганта</CardTitle>
                <CardDescription>
                  Визуализация временной шкалы проекта на 48 недель
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <div className="min-w-[1200px] space-y-4">
                    {/* Временная шкала */}
                    <div className="flex items-center gap-2 mb-6">
                      <div className="w-64 font-semibold text-sm">Этап</div>
                      <div className="flex-1 flex">
                        {Array.from({ length: 12 }, (_, i) => (
                          <div key={i} className="flex-1 text-center text-xs text-muted-foreground border-l border-border">
                            {i * 4 + 1}-{(i + 1) * 4} нед
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Этапы */}
                    {projectData.stages.map((stage) => {
                      const isCritical = criticalPath.includes(stage.id);
                      const leftPercent = ((stage.startWeek - 1) / projectData.duration) * 100;
                      const widthPercent = (stage.duration / projectData.duration) * 100;

                      return (
                        <div
                          key={stage.id}
                          className="flex items-center gap-2 group cursor-pointer hover:bg-muted/50 p-2 rounded-lg transition-colors"
                          onClick={() => setSelectedStage(stage.id)}
                        >
                          <div className="w-64">
                            <div className="font-medium text-sm flex items-center gap-2">
                              {stage.name}
                              {isCritical && (
                                <Badge variant="destructive" className="text-xs">
                                  Критический
                                </Badge>
                              )}
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">
                              {stage.responsible}
                            </div>
                          </div>
                          <div className="flex-1 relative h-10">
                            <div className="absolute inset-0 flex items-center">
                              <div
                                className={`h-8 rounded-lg ${getStatusColor(stage.status)} ${
                                  isCritical ? 'ring-2 ring-destructive ring-offset-2' : ''
                                } shadow-sm flex items-center justify-center text-white text-xs font-medium transition-all group-hover:shadow-md`}
                                style={{
                                  left: `${leftPercent}%`,
                                  width: `${widthPercent}%`,
                                }}
                              >
                                {stage.progress > 0 && `${stage.progress}%`}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Легенда */}
                <div className="flex items-center gap-6 mt-6 pt-6 border-t">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-green-500" />
                    <span className="text-sm">Завершён</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-blue-500" />
                    <span className="text-sm">В работе</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-gray-300" />
                    <span className="text-sm">Ожидание</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-red-500 ring-2 ring-red-500 ring-offset-2" />
                    <span className="text-sm">Критический путь</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Критический путь */}
          <TabsContent value="critical" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Критический путь проекта</CardTitle>
                <CardDescription>
                  Последовательность этапов, определяющих минимальную длительность проекта
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-destructive/10 border-l-4 border-destructive p-4 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Icon name="AlertTriangle" className="text-destructive mt-1" size={24} />
                      <div>
                        <h3 className="font-semibold text-destructive mb-1">
                          Внимание: все этапы критичны
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Задержка любого этапа приведёт к сдвигу всего проекта. Все этапы имеют
                          последовательные зависимости и нулевой временной резерв.
                        </p>
                      </div>
                    </div>
                  </div>

                  {projectData.stages.map((stage, index) => (
                    <div key={stage.id} className="flex items-start gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-destructive text-white flex items-center justify-center font-bold">
                          {index + 1}
                        </div>
                        {index < projectData.stages.length - 1 && (
                          <div className="w-0.5 h-16 bg-destructive/30 my-2" />
                        )}
                      </div>
                      <Card className="flex-1 border-destructive/20">
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <div>
                              <CardTitle className="text-lg">{stage.name}</CardTitle>
                              <CardDescription className="mt-1">
                                {stage.description}
                              </CardDescription>
                            </div>
                            {getStatusBadge(stage.status)}
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-muted-foreground">Срок:</span>
                              <span className="ml-2 font-medium">
                                {stage.startWeek}–{stage.endWeek} недели ({stage.duration} нед.)
                              </span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Ответственный:</span>
                              <span className="ml-2 font-medium">{stage.responsible}</span>
                            </div>
                          </div>
                          <div className="mt-3">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs text-muted-foreground">Прогресс</span>
                              <span className="text-xs font-medium">{stage.progress}%</span>
                            </div>
                            <Progress value={stage.progress} className="h-2" />
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Icon name="Info" size={18} />
                    Рекомендации по управлению
                  </h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <Icon name="CheckCircle2" size={16} className="mt-0.5 text-primary" />
                      <span>
                        Выделите дополнительные ресурсы на этапы «Масштабирование» (25 недель) и
                        «Пилотные проекты» (7 недель)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="CheckCircle2" size={16} className="mt-0.5 text-primary" />
                      <span>
                        Создайте временной резерв 1-2 недели после «Организации каналов» для
                        снижения рисков
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="CheckCircle2" size={16} className="mt-0.5 text-primary" />
                      <span>
                        Проводите еженедельный мониторинг прогресса критических этапов
                      </span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Этапы */}
          <TabsContent value="stages" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {projectData.stages.map((stage) => (
                <Card key={stage.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{stage.name}</CardTitle>
                        <CardDescription className="mt-1">{stage.description}</CardDescription>
                      </div>
                      {getStatusBadge(stage.status)}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2">
                        <Icon name="Calendar" size={16} className="text-muted-foreground" />
                        <span>
                          {stage.startWeek}–{stage.endWeek} нед.
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Icon name="Clock" size={16} className="text-muted-foreground" />
                        <span>{stage.duration} недель</span>
                      </div>
                      <div className="flex items-center gap-2 col-span-2">
                        <Icon name="Users" size={16} className="text-muted-foreground" />
                        <span>{stage.responsible}</span>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Прогресс выполнения</span>
                        <span className="text-sm font-bold text-primary">{stage.progress}%</span>
                      </div>
                      <Progress value={stage.progress} className="h-2" />
                    </div>

                    <div className="pt-3 border-t">
                      <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                        <Icon name="TrendingUp" size={16} />
                        Метрики охвата
                      </h4>
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div className="p-2 bg-muted rounded-lg">
                          <div className="text-lg font-bold text-primary">
                            {stage.metrics.reach.toLocaleString()}
                          </div>
                          <div className="text-xs text-muted-foreground">Reach</div>
                        </div>
                        <div className="p-2 bg-muted rounded-lg">
                          <div className="text-lg font-bold text-primary">
                            {stage.metrics.impressions.toLocaleString()}
                          </div>
                          <div className="text-xs text-muted-foreground">Impressions</div>
                        </div>
                        <div className="p-2 bg-muted rounded-lg">
                          <div className="text-lg font-bold text-primary">
                            {stage.metrics.contacts.toLocaleString()}
                          </div>
                          <div className="text-xs text-muted-foreground">Контакты</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
