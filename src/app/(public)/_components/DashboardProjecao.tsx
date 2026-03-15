"use client"; 

import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

export default function DashboardProjecao() {
    const chartUsuariosRef = useRef<HTMLCanvasElement>(null);
    const chartReceitaRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        // 1. DADOS INICIAIS
        const U0 = 20;
        const C = 0.20;
        const p = 0.10;
        const v = 30; 

        const meses = [];
        const projecaoUsuarios = [];
        const projecaoReceita = [];

        // 2. CÁLCULO DAS PROJEÇÕES (Função Exponencial)
        for (let t = 0; t <= 12; t++) {
            meses.push(t);
            let usuariosNoMes = U0 * Math.pow((1 + C), t);
            projecaoUsuarios.push(Number(usuariosNoMes.toFixed(0)));
            let receitaNoMes = usuariosNoMes * p * v;
            projecaoReceita.push(Number(receitaNoMes.toFixed(2)));
        }

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

        // 3. RENDERIZAÇÃO DO GRÁFICO DE USUÁRIOS
        if (chartUsuariosRef.current) {
            graficoUsuarios = new Chart(chartUsuariosRef.current as any, {
                type: 'line',
                data: {
                    labels: meses,
                    datasets: [{
                        label: 'Crescimento de Usuários',
                        data: projecaoUsuarios,
                        borderColor: '#8C33FF',
                        backgroundColor: 'rgba(140, 51, 255, 0.1)', 
                        borderWidth: 3,
                        pointBackgroundColor: '#ffffff',
                        pointBorderColor: '#8C33FF', 
                        fill: true,
                        tension: 0.4
                    }]
                },
                options: { 
                    responsive: true,
                    color: currentColors.text,
                    scales: { 
                        x: { 
                            ticks: { color: currentColors.text },
                            title: { display: true, text: 'Meses (Tempo)', color: currentColors.text, font: { weight: 'bold' } },
                            grid: { color: currentColors.grid }
                        }, 
                        y: { 
                            ticks: { color: currentColors.text },
                            title: { display: true, text: 'Total de Usuários', color: currentColors.text, font: { weight: 'bold' } },
                            grid: { color: currentColors.grid }
                        } 
                    },
                    plugins: { legend: { labels: { color: currentColors.text } } }
                }
            });
        }

        // 4. RENDERIZAÇÃO DO GRÁFICO DE RECEITA
        if (chartReceitaRef.current) {
            graficoReceita = new Chart(chartReceitaRef.current as any, {
                type: 'line',
                data: {
                    labels: meses,
                    datasets: [{
                        label: 'Receita Projetada (R$)',
                        data: projecaoReceita,
                        borderColor: '#0044DB',
                        backgroundColor: 'rgba(0, 68, 219, 0.1)', 
                        borderWidth: 3,
                        pointBackgroundColor: '#ffffff',
                        pointBorderColor: '#0044DB', 
                        fill: true,
                        tension: 0.4
                    }]
                },
                options: { 
                    responsive: true,
                    color: currentColors.text,
                    scales: { 
                        x: { 
                            ticks: { color: currentColors.text },
                            title: { display: true, text: 'Meses (Tempo)', color: currentColors.text, font: { weight: 'bold' } },
                            grid: { color: currentColors.grid }
                        }, 
                        y: { 
                            ticks: { color: currentColors.text },
                            title: { display: true, text: 'Receita (R$)', color: currentColors.text, font: { weight: 'bold' } },
                            grid: { color: currentColors.grid }
                        } 
                    },
                    plugins: { legend: { labels: { color: currentColors.text } } }
                }
            });
        }

        // 5. INTELIGÊNCIA DE TEMA: Observa cliques no botão de Claro/Escuro
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
                if (chart.options.plugins.legend) {
                    chart.options.plugins.legend.labels.color = newColors.text;
                }
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
                Projeção de Crescimento (12 Meses)
            </h2>

            <p style={{ 
                textAlign: 'center', 
                color: 'var(--text-secondary)', 
                maxWidth: '650px', 
                margin: '0 auto 40px auto', 
                fontSize: '1rem',
                lineHeight: '1.5'
            }}>
                Acompanhe a estimativa mensal de entrada de novos usuários na plataforma e o impacto direto desse volume na nossa receita projetada para o próximo ano.
            </p>

            <div style={{ display: 'flex', gap: '20px', marginBottom: '40px', flexWrap: 'wrap', justifyContent: 'center' }}>
                {[
                    { titulo: 'Usuários Iniciais', valor: '20', corBase: 'var(--color-brand-purple-400)' },
                    { titulo: 'Crescimento Mensal', valor: '20%', corBase: 'var(--color-blue-500)' },
                    { titulo: 'Usuários Pagantes', valor: '10%', corBase: 'var(--color-brand-purple-400)' },
                    { titulo: 'Ticket Médio', valor: 'R$ 30,00', corBase: 'var(--color-blue-500)' }
                ].map((card, index) => (
                    <div key={index} style={{ 
                        flex: '1 1 200px', 
                        maxWidth: '250px', 
                        backgroundColor: 'var(--surface-neutral)', 
                        border: `2px solid ${card.corBase}`, 
                        borderRadius: '12px', 
                        padding: '20px', 
                        textAlign: 'center'
                    }}>
                        <h5 style={{ color: 'var(--text-primary)', fontSize: '14px', marginBottom: '10px', textTransform: 'uppercase', fontWeight: '600' }}>
                            {card.titulo}
                        </h5>
                        <h2 style={{ color: card.corBase, fontWeight: 'bold', margin: 0, fontSize: '1.5rem' }}>
                            {card.valor}
                        </h2>
                    </div>
                ))}
            </div>

            <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', justifyContent: 'center' }}>
                <div style={{ flex: '1 1 450px', maxWidth: '600px', backgroundColor: 'var(--surface-neutral)', border: '1px solid var(--border-primary)', padding: '20px', borderRadius: '12px' }}>
                    <canvas ref={chartUsuariosRef}></canvas>
                </div>
                <div style={{ flex: '1 1 450px', maxWidth: '600px', backgroundColor: 'var(--surface-neutral)', border: '1px solid var(--border-primary)', padding: '20px', borderRadius: '12px' }}>
                    <canvas ref={chartReceitaRef}></canvas>
                </div>
            </div>
        </section>
    );
}