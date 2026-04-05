import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import type { PixelateOptions, ColorPalette } from '../../types';

interface ControlPanelProps {
  options: PixelateOptions;
  onChange: (options: PixelateOptions) => void;
  showGrid: boolean;
  onShowGridChange: (v: boolean) => void;
  disabled: boolean;
}

const DEFAULT_OPTIONS: PixelateOptions = {
  pixelSize: 16,
  colorPalette: 'original',
  shape: 'square',
  contrast: 0,
  brightness: 0,
  customColors: 16,
};

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (v: number) => void;
  disabled: boolean;
  unit?: string;
  // 松开鼠标才触发 onChange（用于耗时操作）
  commitOnRelease?: boolean;
}

function Slider({ label, value, min, max, step = 1, onChange, disabled, unit = '', commitOnRelease = false }: SliderProps) {
  // 拖动时的本地临时值
  const [localValue, setLocalValue] = useState(value);

  // 外部 value 变化时（如重置）同步本地值
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const displayValue = commitOnRelease ? localValue : value;

  const handleChange = (v: number) => {
    if (commitOnRelease) {
      setLocalValue(v);   // 仅更新显示，不触发重渲染
    } else {
      onChange(v);
    }
  };

  const handleCommit = () => {
    if (commitOnRelease) onChange(localValue);
  };

  const handleInputChange = (raw: string) => {
    const v = Math.max(min, Math.min(max, Number(raw)));
    if (isNaN(v)) return;
    if (commitOnRelease) {
      setLocalValue(v);
      onChange(v);  // 手动输入时立即提交
    } else {
      onChange(v);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
        {/* 可手动输入的数值框 */}
        <input
          type="number"
          min={min}
          max={max}
          step={step}
          value={displayValue}
          disabled={disabled}
          onChange={e => handleInputChange(e.target.value)}
          className="w-16 text-right text-sm font-semibold text-primary-600 dark:text-primary-400 tabular-nums bg-transparent border border-gray-200 dark:border-gray-600 rounded px-1.5 py-0.5 focus:outline-none focus:border-primary-400 disabled:opacity-40"
        />
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={displayValue}
        disabled={disabled}
        onChange={e => handleChange(Number(e.target.value))}
        onMouseUp={handleCommit}
        onTouchEnd={handleCommit}
        className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary-600 disabled:opacity-40 disabled:cursor-not-allowed"
      />
      <div className="flex justify-between text-[10px] text-gray-400 dark:text-gray-500 mt-1">
        <span>{min}{unit}</span>
        <span>{max}{unit}</span>
      </div>
    </div>
  );
}

function OptionGroup<T extends string>({
  options, value, onChange, disabled,
}: {
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
  disabled: boolean;
}) {
  return (
    <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
      {options.map(opt => (
        <button
          key={opt.value}
          disabled={disabled}
          onClick={() => onChange(opt.value)}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
            value === opt.value
              ? 'bg-primary-600 text-white border-primary-600 shadow-sm'
              : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-600 hover:border-primary-400 hover:text-primary-600'
          } disabled:opacity-40 disabled:cursor-not-allowed`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

export function ControlPanel({ options, onChange, showGrid, onShowGridChange, disabled }: ControlPanelProps) {
  const { t } = useTranslation();

  const update = (partial: Partial<PixelateOptions>) => {
    onChange({ ...options, ...partial });
  };

  const paletteOptions: { value: ColorPalette; label: string }[] = [
    { value: 'original',  label: t('controls.palette_original') },
    { value: 'grayscale', label: t('controls.palette_grayscale') },
    { value: '8bit',      label: t('controls.palette_8bit') },
  ];

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm p-5 space-y-6">
      {/* 像素大小 */}
      <Slider
        label={t('controls.pixel_size')}
        value={options.pixelSize}
        min={2}
        max={64}
        onChange={v => update({ pixelSize: v })}
        disabled={disabled}
        unit="px"
      />

      {/* 调色板 */}
      <div>
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">
          {t('controls.color_palette')}
        </label>
        <OptionGroup
          options={paletteOptions}
          value={options.colorPalette}
          onChange={v => update({ colorPalette: v })}
          disabled={disabled}
        />
      </div>

      {/* 亮度 / 对比度（松开才触发渲染） */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Slider
          label={t('controls.brightness')}
          value={options.brightness}
          min={-50}
          max={50}
          onChange={v => update({ brightness: v })}
          disabled={disabled}
          commitOnRelease
        />
        <Slider
          label={t('controls.contrast')}
          value={options.contrast}
          min={-50}
          max={50}
          onChange={v => update({ contrast: v })}
          disabled={disabled}
          commitOnRelease
        />
      </div>

      {/* 网格线开关 */}
      <label className={`flex items-center gap-3 cursor-pointer select-none ${disabled ? 'opacity-40 pointer-events-none' : ''}`}>
        <div
          onClick={() => onShowGridChange(!showGrid)}
          className={`relative w-10 h-5 rounded-full transition-colors ${showGrid ? 'bg-primary-600' : 'bg-gray-200 dark:bg-gray-700'}`}
        >
          <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${showGrid ? 'translate-x-5' : ''}`} />
        </div>
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('controls.show_grid')}</span>
      </label>

      {/* 重置 */}
      <button
        onClick={() => onChange(DEFAULT_OPTIONS)}
        disabled={disabled}
        className="w-full text-sm text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 border border-gray-200 dark:border-gray-700 rounded-lg py-2 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {t('controls.reset')}
      </button>
    </div>
  );
}

export { DEFAULT_OPTIONS };
