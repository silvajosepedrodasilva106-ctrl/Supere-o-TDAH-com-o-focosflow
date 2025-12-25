
import React from 'react';
import { Trophy, Target, BookOpen, ShoppingBag, Heart, ListChecks, BrainCircuit } from 'lucide-react';
import { Achievement, Product } from './types';

export const ACHIEVEMENTS: Achievement[] = [
  { id: '1', title: 'Primeiro Passo', description: 'Completou a primeira autoavaliação', icon: '🌱', unlocked: true },
  { id: '2', title: 'Mestre do Foco', description: 'Completou 5 sessões de Pomodoro', icon: '⏱️', unlocked: false },
  { id: '3', title: 'Zen', description: 'Praticou mindfulness por 3 dias seguidos', icon: '🧘', unlocked: true },
  { id: '4', title: 'Organizador', description: 'Limpou sua lista de tarefas diárias', icon: '✅', unlocked: false },
];

export const PREMIUM_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Guia Definitivo da Rotina Inabalável',
    description: 'Um e-book prático com 50 estratégias para organizar seu dia sem estresse.',
    price: 'R$ 47,00',
    image: 'https://picsum.photos/seed/book/400/300',
    link: 'https://pay.kiwify.com.br/1t43T8i'
  },
  {
    id: 'p2',
    name: 'Mentoria FocusFlow Individual',
    description: 'Acompanhamento personalizado para adaptar o método ao seu estilo de vida.',
    price: 'R$ 197,00',
    image: 'https://picsum.photos/seed/mentor/400/300',
    link: 'https://pay.kiwify.com.br/1t43T8i'
  },
  {
    id: 'p3',
    name: 'Kit de Meditações Guiadas Premium',
    description: 'Áudios específicos para silenciar o ruído mental e focar no que importa.',
    price: 'R$ 29,90',
    image: 'https://picsum.photos/seed/meditation/400/300',
    link: 'https://pay.kiwify.com.br/1t43T8i'
  }
];

export const QUOTES = [
  "O seu cérebro funciona de um jeito único, e isso é a sua maior força.",
  "Progresso, não perfeição. Um pequeno passo hoje é uma grande vitória.",
  "Respire. Você está fazendo o seu melhor, e isso é o suficiente.",
  "Divida a montanha em pequenas pedras. Fica mais fácil de carregar.",
  "Sua criatividade é o seu superpoder. Deixe-a brilhar."
];
