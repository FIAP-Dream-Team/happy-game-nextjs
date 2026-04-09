"use client"; 

import { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

export default function DashboardProjecao() {
    const chartUsuariosRef = useRef<HTMLCanvasElement>(null);
    const chartReceitaRef = useRef<HTMLCanvasElement>(null);

    const [insights, setInsights] = useState({ 
        totalFinal: 0, 
        ativosFinal: 0, 
        taxa: '0',
        receitaPerdida: 0 
    });

    useEffect(() => {
        // 1. DADOS MATEMÁTICOS (Limites e Tendências)
        const L = 2000;      // Capacidade de Carga (Limite)
        const U0 = 20;       // Usuários Iniciais
        const k = 0.6;       // Taxa de Crescimento (Logístico)
        const c = 0.05;      // Taxa de Evasão / Churn Rate (5% ao mês)
        const p = 0.10;      // Proporção de usuários pagantes
        const v = 30;        // Ticket médio

        const meses = [];
        const projecaoTotalContas = [];
        const projecaoUsuariosAtivos = [];
        const projecaoReceitaPotencial = [];
        const projecaoReceitaRealista = [];

        // 2. CÁLCULO DAS PROJEÇÕES
        for (let t = 0; t <= 12; t++) {
            meses.push(t);
            
            // Gráfico 1: Usuários
            let totalNoMes = L / (1 + ((L - U0) / U0) * Math.exp(-k * t));
            projecaoTotalContas.push(Number(totalNoMes.toFixed(0)));

            let ativosNoMes = totalNoMes * Math.exp(-c * t);
            projecaoUsuariosAtivos.push(Number(ativosNoMes.toFixed(0)));

            // Gráfico 2: Receita
            let receitaPotencial = totalNoMes * p * v; 
            projecaoReceitaPotencial.push(Number(receitaPotencial.toFixed(2)));

            let receitaReal = ativosNoMes * p * v;
            projecaoReceitaRealista.push(Number(receitaReal.toFixed(2)));
        }

        setInsights({
            totalFinal: projecaoTotalContas[12],
            ativosFinal: projecaoUsuariosAtivos[12],
            taxa: ((projecaoUsuariosAtivos[12] / projecaoTotalContas[12]) * 100).toFixed(1),
            receitaPerdida: Number((projecaoReceitaPotencial[12] - projecaoReceitaRealista[12]).toFixed(2))
        });

        const getThemeColors = () => {
            const isDark = document.documentElement.classList.contains('dark');
            return {
                text: isDark ? '#fafafa' : '#0a0a0a',
                grid: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
            };
        };

        let currentColors = getThemeColors();
        let graficoUsuarios: any = null;
        let graficoReceita: any = null;

        // 3. GRÁFICO
        if (chartUsuariosRef.current) {
            graficoUsuarios = new Chart(chartUsuariosRef.current as any, {
                type: 'line',
                data: {
                    labels: meses,
                    datasets: [
                        {
                            label: 'Total de Contas (Potencial)',
                            data: projecaoTotalContas,
                            borderColor: '#8b5cf6',
                            backgroundColor: 'transparent', 
                            borderWidth: 2,
                            borderDash: [5, 5],
                            pointRadius: 0,
                            tension: 0.4
                        },
                        {
                            label: 'Usuários Ativos (Realidade)',
                            data: projecaoUsuariosAtivos,
                            borderColor: '#10b981',
                            backgroundColor: 'rgba(16, 185, 129, 0.15)', 
                            borderWidth: 3,
                            pointBackgroundColor: '#ffffff',
                            pointBorderColor: '#10b981', 
                            fill: '-1', 
                            tension: 0.4
                        }
                    ]
                },
                options: { 
                    responsive: true,
                    color: currentColors.text,
                    interaction: { mode: 'index', intersect: false }, 
                    scales: { 
                        x: { 
                            ticks: { color: currentColors.text },
                            title: { display: true, text: 'Meses de Operação', color: currentColors.text },
                            grid: { color: currentColors.grid }
                        }, 
                        y: { 
                            ticks: { color: currentColors.text },
                            title: { display: true, text: 'Número de Usuários', color: currentColors.text },
                            grid: { color: currentColors.grid },
                            suggestedMax: 2200 
                        } 
                    },
                    plugins: { 
                        legend: { labels: { color: currentColors.text } },
                        tooltip: {
                            callbacks: {
                                footer: (tooltipItems) => {
                                    const evasao = tooltipItems[0].raw as number - (tooltipItems[1].raw as number);
                                    return `🔴 Evasão (Churn): ${evasao} usuários perdidos`;
                                }
                            }
                        }
                    }
                }
            });
        }

        // 4. GRÁFICO 2: RECEITA POTENCIAL VS REALISTA
        if (chartReceitaRef.current) {
            graficoReceita = new Chart(chartReceitaRef.current as any, {
                type: 'line',
                data: {
                    labels: meses,
                    datasets: [
                        {
                            label: 'Receita Potencial (Sem Evasão)',
                            data: projecaoReceitaPotencial,
                            borderColor: '#8b5cf6', 
                            backgroundColor: 'transparent', 
                            borderWidth: 2,
                            borderDash: [5, 5],
                            pointRadius: 0,
                            tension: 0.4
                        },
                        {
                            label: 'Receita Realista (Baseada nos Ativos)',
                            data: projecaoReceitaRealista,
                            borderColor: '#10b981', 
                            backgroundColor: 'rgba(239, 68, 68, 0.15)',
                            borderWidth: 3,
                            pointBackgroundColor: '#ffffff',
                            pointBorderColor: '#10b981', 
                            fill: '-1',
                            tension: 0.4
                        }
                    ]
                },
                options: { 
                    responsive: true,
                    color: currentColors.text,
                    interaction: { mode: 'index', intersect: false },
                    scales: { 
                        x: { 
                            ticks: { color: currentColors.text },
                            title: { display: true, text: 'Meses de Operação', color: currentColors.text },
                            grid: { color: currentColors.grid }
                        }, 
                        y: { 
                            ticks: { 
                                color: currentColors.text,
                                callback: function(value) { return 'R$ ' + value; } 
                            },
                            title: { display: true, text: 'Receita Mensal', color: currentColors.text },
                            grid: { color: currentColors.grid }
                        } 
                    },
                    plugins: { 
                        legend: { labels: { color: currentColors.text } },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    let label = context.dataset.label || '';
                                    if (label) { label += ': '; }
                                    if (context.parsed.y !== null) {
                                        label += new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(context.parsed.y);
                                    }
                                    return label;
                                },
                                footer: (tooltipItems) => {
                                    const perda = (tooltipItems[0].raw as number) - (tooltipItems[1].raw as number);
                                    return `💸 Prejuízo pela evasão: R$ ${perda.toFixed(2)}`;
                                }
                            }
                        }
                    }
                }
            });
        }

        const observer = new MutationObserver(() => {
            const newColors = getThemeColors();
            const updateChartColors = (chart: any) => {
                if (!chart) return;
                chart.options.color = newColors.text;
                chart.options.scales.x.ticks.color = newColors.text;
                chart.options.scales.x.title.color = newColors.text;
                chart.options.scales.x.grid.color = newColors.grid;
                chart.options.scales.y.ticks.color = newColors.text;
                chart.options.scales.y.title.color = newColors.text;
                chart.options.scales.y.grid.color = newColors.grid;
                if (chart.options.plugins.legend) chart.options.plugins.legend.labels.color = newColors.text;
                chart.update();
            };
            updateChartColors(graficoUsuarios);
            updateChartColors(graficoReceita);
        });

        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

        return () => {
            observer.disconnect();
            if (graficoUsuarios) graficoUsuarios.destroy();
            if (graficoReceita) graficoReceita.destroy();
        };
    }, []);

    return (
        <section style={{ padding: '20px 0', backgroundColor: 'transparent', marginTop: '0' }}>
            <h2 style={{ textAlign: 'center', color: 'var(--text-primary)', marginBottom: '12px', fontWeight: 'bold', fontSize: '1.8rem' }}>
                Análise Preditiva e Impacto Financeiro
            </h2>

            <p style={{ 
                textAlign: 'center', color: 'var(--text-secondary)', maxWidth: '750px', 
                margin: '0 auto 40px auto', fontSize: '1rem', lineHeight: '1.6'
            }}>
                O gráfico de <strong>Usuários</strong> demonstra o teto do mercado logístico cruzado com a taxa de retenção. 
                O gráfico de <strong>Receita</strong> reflete diretamente essa evasão, mostrando o prejuízo financeiro gerado pelos usuários que abandonam a plataforma.
            </p>

            <div style={{ display: 'flex', gap: '20px', marginBottom: '30px', flexWrap: 'wrap', justifyContent: 'center' }}>
                {[
                    { titulo: 'Teto de Mercado (L)', valor: '2.000', corBase: '#8b5cf6' },
                    { titulo: 'Taxa de Tração (k)', valor: '0.6', corBase: '#3b82f6' },
                    { titulo: 'Evasão (Churn)', valor: '5% / mês', corBase: '#ef4444' },
                    { titulo: 'Ticket Médio', valor: 'R$ 30,00', corBase: '#10b981' }
                ].map((card, index) => (
                    <div key={index} style={{ 
                        flex: '1 1 200px', maxWidth: '250px', backgroundColor: 'var(--surface-neutral)', 
                        border: `2px solid ${card.corBase}`, borderRadius: '12px', padding: '20px', textAlign: 'center'
                    }}>
                        <h5 style={{ color: 'var(--text-primary)', fontSize: '13px', marginBottom: '8px', textTransform: 'uppercase', fontWeight: '600' }}>
                            {card.titulo}
                        </h5>
                        <h2 style={{ color: card.corBase, fontWeight: 'bold', margin: 0, fontSize: '1.4rem' }}>
                            {card.valor}
                        </h2>
                    </div>
                ))}
            </div>

            {/* Painel Preditivo Automático */}
            <div style={{ maxWidth: '1224px', margin: '0 auto 30px auto', padding: '20px', backgroundColor: 'rgba(239, 68, 68, 0.05)', borderLeft: '4px solid #ef4444', borderRadius: '8px' }}>
                <p style={{ color: 'var(--text-primary)', margin: 0, fontSize: '1rem', lineHeight: '1.5' }}>
                    <strong>🚨 Alerta Preditivo (Mês 12):</strong> A retenção de usuários estabilizará em <strong>{insights.taxa}%</strong>. 
                    Devido à queda de retenção entre as contas totais ({insights.totalFinal}) e as ativas ({insights.ativosFinal}), 
                    a plataforma deixará de arrecadar <strong>R$ {insights.receitaPerdida.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</strong> neste mês. Estratégias de engajamento são recomendadas.
                </p>
            </div>

            <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', justifyContent: 'center' }}>
                <div style={{ flex: '1 1 450px', maxWidth: '600px', backgroundColor: 'var(--surface-neutral)', border: '1px solid var(--border-primary)', padding: '20px', borderRadius: '12px' }}>
                    <h3 style={{ textAlign: 'center', marginBottom: '15px', color: 'var(--text-primary)', fontSize: '1.1rem' }}>Curva de Retenção e Evasão</h3>
                    <canvas ref={chartUsuariosRef}></canvas>
                </div>
                <div style={{ flex: '1 1 450px', maxWidth: '600px', backgroundColor: 'var(--surface-neutral)', border: '1px solid var(--border-primary)', padding: '20px', borderRadius: '12px' }}>
                    <h3 style={{ textAlign: 'center', marginBottom: '15px', color: 'var(--text-primary)', fontSize: '1.1rem' }}>Impacto na Receita Mensal</h3>
                    <canvas ref={chartReceitaRef}></canvas>
                </div>
            </div>
        </section>
    );
}