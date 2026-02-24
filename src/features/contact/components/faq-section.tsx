'use client';

import { useState } from 'react';
import { HelpCircle, PlusCircle, Settings, User, ChevronDown } from 'lucide-react';
import { faqCategories } from '../utils/faq-data';
import type { FAQCategory } from '../types';

const iconMap = {
  HelpCircle,
  PlusCircle,
  Settings,
  User
};

export function FAQSection() {
  const [activeCategory, setActiveCategory] = useState<FAQCategory>('genel');
  const [openQuestions, setOpenQuestions] = useState<Set<string>>(new Set());

  const toggleQuestion = (questionId: string) => {
    setOpenQuestions((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(questionId)) {
        newSet.delete(questionId);
      } else {
        newSet.add(questionId);
      }
      return newSet;
    });
  };

  const activeCategoryData = faqCategories.find(cat => cat.id === activeCategory);

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
            Sıkça Sorulan Sorular
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Merak ettiğiniz soruların yanıtlarını burada bulabilirsiniz
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {faqCategories.map((category) => {
            const Icon = iconMap[category.icon as keyof typeof iconMap];
            const isActive = activeCategory === category.id;

            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`
                  flex items-center gap-2 px-6 py-3 rounded-xl font-semibold
                  transition-all duration-300
                  ${isActive
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }
                `}
              >
                <Icon size={20} />
                <span>{category.name}</span>
              </button>
            );
          })}
        </div>

        {/* FAQ Items */}
        <div className="max-w-4xl mx-auto space-y-4">
          {activeCategoryData?.items.map((faq, index) => {
            const isOpen = openQuestions.has(faq.id);

            return (
              <div
                key={faq.id}
                className="bg-white border-2 border-gray-200 rounded-2xl overflow-hidden hover:border-indigo-300 transition-all duration-300 animate-in fade-in slide-in-from-bottom-4"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <button
                  onClick={() => toggleQuestion(faq.id)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="text-lg font-bold text-gray-900 pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    size={24}
                    className={`flex-shrink-0 text-indigo-600 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <div
                  className={`
                    overflow-hidden transition-all duration-300
                    ${isOpen ? 'max-h-96' : 'max-h-0'}
                  `}
                >
                  <div className="px-6 pb-5 pt-2">
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Sorunuz burada yok mu?
          </p>
          <a
            href="#contact-form"
            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-colors shadow-lg hover:shadow-xl"
          >
            <span>Bize Sorun</span>
            <ChevronDown size={20} className="rotate-180" />
          </a>
        </div>
      </div>
    </section>
  );
}
