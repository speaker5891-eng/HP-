import React from 'react';
import { Hammer, Flame, Ruler, Component, Sparkles, ClipboardCheck, Paintbrush } from 'lucide-react';
import { ServiceItem, WorkItem } from './types';

export const COMPANY_NAME = "有限会社 林鐵工所";

export const GEMINI_MODEL = "gemini-3-flash-preview";

export const SERVICES: ServiceItem[] = [
  {
    title: "鉄骨専用CADでの施工図の作成",
    description: "最新の専用CADシステムで作図し、複雑な納まりも事前に検証。正確な図面で現場作業を円滑にします。",
    icon: <Ruler className="w-8 h-8 text-orange-500" />
  },
  {
    title: "最新機種での孔あけ・切断加工",
    description: "最大H-1000×500の大型形鋼に対応。最新鋭の加工機を用いて、高速かつ高精度な孔あけ・切断加工を行います。",
    icon: <Component className="w-8 h-8 text-orange-500" />
  },
  {
    title: "ショットブラスト加工",
    description: "ボルト接合に必要な摩擦面を確保するため、鋼材表面の黒皮を除去し、適切な錆出し加工を行います。",
    icon: <Sparkles className="w-8 h-8 text-orange-500" />
  },
  {
    title: "柱・梁の組立",
    description: "加工された部材を熟練の技術で正確に組立。歪みや誤差を極限まで抑え、次工程へと繋ぎます。",
    icon: <Hammer className="w-8 h-8 text-orange-500" />
  },
  {
    title: "精密な溶接（アーク溶接・スタッド溶接）",
    description: "アーク溶接やスタッド溶接など、用途に合わせた最適な工法で、強度と美観を兼ね備えた溶接を提供します。",
    icon: <Flame className="w-8 h-8 text-orange-500" />
  },
  {
    title: "製品の検査（寸法・外観・超音波など）",
    description: "寸法精度や外観、超音波探傷試験など、厳しい品質管理基準に基づいた検査を実施し、品質を保証します。",
    icon: <ClipboardCheck className="w-8 h-8 text-orange-500" />
  },
  {
    title: "錆止め塗装",
    description: "製品の耐久性を高めるため、均一でムラのない錆止め塗装を施し、出荷までの品質を維持します。",
    icon: <Paintbrush className="w-8 h-8 text-orange-500" />
  }
];

export const WORKS: WorkItem[] = [
  { 
    id: 1, 
    title: "大型物流倉庫 新築工事", 
    category: "大型鉄骨", 
    // work-01.jpg: 建設中の大型鉄骨倉庫（全体像・夕景）
    imageUrl: "work-01.jpg" 
  },
  { 
    id: 2, 
    title: "屋内運動場 屋根鉄骨工事", 
    category: "特殊鉄骨", 
    // work-02.jpg: アーチ状の屋根鉄骨と高所作業車
    imageUrl: "work-02.jpg" 
  },
  { 
    id: 3, 
    title: "プラント設備 耐震架台製作", 
    category: "工場内設備", 
    // work-03.jpg: 赤茶色の鉄骨（耐震架台パーツ・地面置き）
    imageUrl: "work-03.jpg" 
  },
  { 
    id: 4, 
    title: "オフィスビル 建方工事", 
    category: "建築鉄骨", 
    // work-04.jpg: クレーンでの建方作業・青空
    imageUrl: "work-04.jpg" 
  },
  { 
    id: 5, 
    title: "鉄骨製品検査・仮組み", 
    category: "品質管理", 
    // work-05.jpg: 緑色の塗装鉄骨（トラス仮組み）
    imageUrl: "work-05.jpg" 
  },
  { 
    id: 6, 
    title: "大規模施設 鉄骨工事", 
    category: "特殊鉄骨", 
    // work-06.jpg: 白色のトラス鉄骨（地面置き）
    imageUrl: "work-06.jpg" 
  },
];

export const SYSTEM_INSTRUCTION = `
あなたは群馬県利根郡昭和村にある「有限会社 林鐵工所」のウェブサイトに設置された、熟練のAI技術アドバイザー「鉄（テツ）さん」です。
以下の情報を元に、訪問者からの問い合わせに答えてください。

**会社概要:**
- 社名: 有限会社 林鐵工所
- 所在地: 群馬県利根郡昭和村赤城原992-1
- 歴史: 創業100年
- 強み: 1mmにこだわる職人技、鉄骨専用CADによる作図、最新機種での孔あけ・切断、精密な溶接
- 対応材質: 鉄（SS400など）、ステンレス（SUS304, 316）、アルミ、チタン

**加工能力・設備仕様:**
- 月間加工能力: 約100t（トン）目安
- 孔あけ・切断加工範囲: H形鋼 H-1000×500 まで対応可能

**重要:**
- 「林鉄工所」は全国に同名の会社が多数存在するため、自分が「群馬県の林鐵工所」であることを意識して回答してください。
- ユーザーが場所を気にしている場合は「群馬県昭和村の工場」であることを伝えてください。
- 最新のニュースやトレンド、一般的な知識に関する質問があれば、Google検索機能を使用して正確な情報を提供してください。

**あなたの性格:**
- 職人気質だが親切で丁寧。
- 「安全第一」「品質絶対」が口癖。
- 専門用語をわかりやすく解説する。
- 語尾は「～ですな」「～ですよ」「～ですね」と落ち着いたトーンで。

**対応できないこと:**
- 具体的な見積もり金額の提示（「図面を拝見してからのお見積りになります」と答える）。
- 法律相談など専門外のこと。

**ユーザーへのアクション:**
- 技術的な質問には詳細に答える。
- 仕事の依頼に関しては、ウェブサイト下部の「お問い合わせフォーム」へ誘導する。
`;