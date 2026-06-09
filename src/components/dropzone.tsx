"use client";

import { useDropzone } from "react-dropzone";
import { cn } from "@/lib/utils";
import { useMemo } from "react";

type Variant = "default" | "card";
type Size = "sm" | "md" | "lg";

type Props = {
  variant?: Variant;
  size?: Size;

  maxFiles?: number;
  multiple?: boolean;
  disabled?: boolean;

  extensions?: string[];

  // 👇 controlled state
  files: File[];
  onChange: (files: File[]) => void;
};

export function Dropzone({
  variant = "default",
  size = "md",
  maxFiles = 5,
  multiple = true,
  disabled = false,
  extensions,

  files,
  onChange,
}: Props) {
  const allowed = extensions?.map((e) => e.toLowerCase());

  const accept = allowed?.length
    ? {
        "application/*": allowed.map((ext) => `.${ext}`),
      }
    : undefined;

  const validateFiles = (incoming: File[]) => {
    if (!allowed?.length) return incoming;

    return incoming.filter((file) => {
      const ext = file.name.split(".").pop()?.toLowerCase();
      return ext ? allowed.includes(ext) : false;
    });
  };

  const addFiles = (incoming: File[]) => {
    const valid = validateFiles(incoming);

    const merged = [...files, ...valid];

    const limited =
      maxFiles && merged.length > maxFiles
        ? merged.slice(0, maxFiles)
        : merged;

    onChange(limited);
  };

  const removeFile = (index: number) => {
    const updated = files.filter((_, i) => i !== index);
    onChange(updated);
  };

  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      multiple,
      disabled,
      maxFiles,
      accept,
      onDrop: addFiles,
    });

  const containerHeight = useMemo(() => {
    switch (size) {
      case "sm":
        return "max-h-32";
      case "md":
        return "max-h-48";
      case "lg":
        return "max-h-64";
      default:
        return "max-h-48";
    }
  }, [size]);

  return (
    <div
      {...getRootProps()}
      className={cn(
        "border-2 border-dashed transition cursor-pointer select-none",
        "flex flex-col gap-3",

        isDragActive && "border-primary bg-muted/40",
        disabled && "opacity-50 cursor-not-allowed",

        variant === "card" && "bg-muted/30",
        size === "sm" && "p-3 text-sm",
        size === "md" && "p-5",
        size === "lg" && "p-8"
      )}
    >
      <input {...getInputProps()} />

      {/* HEADER */}
      <div className="text-center space-y-1">
        <p className="text-sm font-medium">
          {disabled
            ? "Загрузка отключена"
            : isDragActive
            ? "Перетащите файл сюда"
            : "Перетащите сюда файл или нажмите чтобы выбрать"}
        </p>

        {allowed?.length ? (
          <p className="text-xs text-muted-foreground">
            Разрешено: {allowed.join(", ")}
          </p>
        ) : (
          <p className="text-xs text-muted-foreground">
            Все типы файлов разрешены
          </p>
        )}
      </div>

      {/* FILE LIST */}
      {files.length > 0 && (
        <div
          className={cn(
            "w-full overflow-y-auto space-y-2 pr-1",
            containerHeight
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {files.map((file, idx) => (
            <div
              key={file.name + idx}
              className="flex items-center justify-between gap-2 bg-muted/40 px-2 py-1"
            >
              <div className="flex flex-col overflow-hidden">
                <span className="text-sm truncate max-w-[200px]">
                  {file.name}
                </span>
                <span className="text-xs text-muted-foreground">
                  {(file.size / 1024).toFixed(1)} KB
                </span>
              </div>

              <button
                type="button"
                className="text-xs text-red-500 hover:underline"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile(idx);
                }}
              >
                Удалить
              </button>
            </div>
          ))}
        </div>
      )}

      {/* ERRORS */}
      {fileRejections.length > 0 && (
        <p className="text-xs text-red-500 text-center">
          Некоторые файлы были отклонены
        </p>
      )}

      {/* MAX INFO */}
      {maxFiles ? (
        <p className="text-xs text-muted-foreground text-center">
          Макс. количество файлов: {maxFiles}
        </p>
      ) : null}
    </div>
  );
}