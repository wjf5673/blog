import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { get, post, ApiError } from "../utils/api";
import { createSparkEffect } from "../utils/animationUtils";
import gsap from "gsap";
import "./StickyNoteWall.css";

// 便签类型定义
interface StickyNote {
  id: string;
  note: string; // API返回的字段名是note
  author?: string; // API返回的数据中没有author字段
  color?: string;
  createdAt: number | string; // 可能是时间戳或ISO字符串
  x?: number;
  y?: number;
  rotation?: number;
}

// API请求的数据格式
interface NoteRequest {
  note: string;
}

// 便签颜色选项
const NOTE_COLORS = [
  "#FFD93D", // 黄色
  "#6BCF7F", // 绿色
  "#FF6B6B", // 红色
  "#4ECDC4", // 青色
  "#FFB6C1", // 粉色
  "#DDA0DD", // 紫色
  "#87CEEB", // 天蓝色
  "#F0E68C", // 卡其色
];

const StickyNoteWall: React.FC = () => {
  const { t } = useTranslation();
  const [notes, setNotes] = useState<StickyNote[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [newNote, setNewNote] = useState({ note: "" });
  const [error, setError] = useState<string | null>(null);
  const [showAddButton, setShowAddButton] = useState(true);
  const isMobile = window.innerWidth <= 768;

  const wallRef = useRef<HTMLDivElement>(null);
  const noteRefs = useRef<(HTMLDivElement | null)[]>([]);

  // 加载便签数据
  const loadNotes = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await get<StickyNote[]>("/notes");
      console.info("API Response:", response);
      if (response.status === 200 && response.data) {
        // 为每个便签添加随机位置和旋转角度，并转换数据格式
        const notesWithPosition = response?.data.map((note, index) => ({
          id: note.id,
          note: note.note,
          author: "访客", // API返回的数据中没有author字段，使用默认值
          color: NOTE_COLORS[index % NOTE_COLORS.length],
          createdAt:
            typeof note.createdAt === "number"
              ? new Date(note.createdAt * 1000).toISOString() // 时间戳转换
              : new Date(note.createdAt).toISOString(), // 字符串直接使用
          // 改进位置计算：使用网格分布 + 随机偏移
          x: isMobile ? (index % 3) * 80 - 50 + (Math.random() - 0.5) * 10 : (index % 6) * 80 - 200 + (Math.random() - 0.5) * 10, // 网格分布 + 随机偏移
          y: isMobile ? Math.floor(index / 3) * 40 - 80 + (Math.random() - 0.5) * 10 : Math.floor(index / 6) * 40 - 80 + (Math.random() - 0.5) * 10, // 网格分布 + 随机偏移
          rotation: Math.random() * 10 - 5, // -5° 到 5° 的旋转
        }));
        setNotes(notesWithPosition);
      }
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError(t("stickyNotes.loadError"));
      }
    } finally {
      setIsLoading(false);
    }
  };

  // 提交新便签
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newNote.note.trim()) {
      setError("请填写便签内容");
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      const noteData: NoteRequest = {
        note: newNote.note.trim(),
      };

      const response = await post<StickyNote>("/notes", noteData);

      if (response.status === 201 && response.data) {
        setShowAddButton(false); // 提交成功后隐藏添加按钮
        // 添加新便签到列表，带有动画效果的位置
        const newNoteWithPosition: StickyNote = {
          ...response.data,
          author: "访客", // 设置默认作者
          color: NOTE_COLORS[Math.floor(Math.random() * NOTE_COLORS.length)],
          createdAt: response.data.createdAt
            ? (typeof response.data.createdAt === 'number' 
                ? new Date(response.data.createdAt * 1000).toISOString()
                : new Date(response.data.createdAt).toISOString())
            : new Date().toISOString(),
          // 使用网格分布 + 随机偏移，避免便签堆叠在中间
          x: isMobile ? (notes.length % 3) * 80 - 50 + (Math.random() - 0.5) * 10 : (notes.length % 6) * 80 - 200 + (Math.random() - 0.5) * 10, // 于现有便签数量计算网格位置
          y: isMobile ? Math.floor(notes.length / 3) * 40 - 80 + (Math.random() - 0.5) * 10 : Math.floor(notes.length / 6) * 40 - 80 + (Math.random() - 0.5) * 10, // 网格分布 + 随机偏移
          rotation: Math.random() * 10 - 5,
        };

        setNotes((prev) => [newNoteWithPosition, ...prev]);
        
        // 立即为新便签设置最高的z-index
        setTimeout(() => {
          const newNoteElement = noteRefs.current[0];
          if (newNoteElement) {
            newNoteElement.style.zIndex = "1000"; // 设置最高层级
            console.log("设置新便签z-index:", newNoteElement.style.zIndex);
          }
        }, 50); // 等待DOM更新后设置
        setNewNote({ note: "" });
        setShowForm(false);

        // 添加成功动画效果
        setTimeout(() => {
          const newNoteElement = noteRefs.current[0];
          if (newNoteElement) {
            createSparkEffect(
              newNoteElement.getBoundingClientRect().left +
                newNoteElement.offsetWidth / 2,
              newNoteElement.getBoundingClientRect().top +
                newNoteElement.offsetHeight / 2
            );
            
            // 为新便签添加new-note CSS类
            newNoteElement.classList.add('new-note');
            console.log("添加新便签CSS类: new-note");
            
            // 1秒后移除特殊类，让便签回到正常层级
            setTimeout(() => {
              newNoteElement.classList.remove('new-note');
              console.log("移除新便签CSS类");
            }, 1000);
          }
        }, 100);
      }
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError(t("stickyNotes.submitError"));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // 便签飘动动画
  useEffect(() => {
    noteRefs.current.forEach((note, index) => {
      if (note) {
        // 创建飘动动画
        const tl = gsap.timeline({ repeat: -1, yoyo: true });
        tl.to(note, {
          y: "+=5",
          rotation: "+=2",
          duration: 3 + Math.random() * 2,
          ease: "sine.inOut",
          delay: index * 0.2, // 错开动画时间
        });
      }
    });
  }, [notes]);

  // 初始化加载
  useEffect(() => {
    loadNotes();
  }, []);

  return (
    <section className="sticky-note-wall-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">{t("stickyNotes.title")}</h2>
          <p className="section-description">{t("stickyNotes.description")}</p>
          { showAddButton && (<button className="add-note-btn" onClick={() => setShowForm(true)}>
            {t("stickyNotes.addNote")}
          </button>)}
        </div>

        {error && (
          <div className="error-message">
            {error}
            <button onClick={() => setError(null)} className="close-error">
              ×
            </button>
          </div>
        )}

        {/* 便签墙 */}
        <div className="sticky-note-wall" ref={wallRef}>
          {isLoading ? (
            <div className="loading-notes">
              <div className="loading-spinner"></div>
              <p>{t("stickyNotes.loading")}</p>
            </div>
          ) : (
            <div className="notes-container">
              {notes.map((note, index) => (
                <div
                  key={note.id}
                  className="sticky-note"
                  ref={(el) => {
                    noteRefs.current[index] = el;
                  }}
                  style={{
                    backgroundColor: note.color,
                    transform: `translate(${note.x}%, ${note.y}%) rotate(${note.rotation}deg)`,
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    marginLeft: "-100px",
                    marginTop: "-100px",
                  }}
                >
                  {/* 钉子效果 */}
                  <div className="pin"></div>

                  {/* 便签内容 */}
                  <div className="note-content">
                    <p className="note-text">{note.note}</p>
                    <div className="note-footer">
                      <span className="note-author">
                        — {note.author || "访客"}
                      </span>
                      <span className="note-date">
                        {typeof note.createdAt === "number"
                          ? new Date(note.createdAt * 1000).toLocaleDateString()
                          : new Date(note.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 添加便签表单模态框 */}
        {showForm && (
          <div className="note-form-modal">
            <div
              className="modal-overlay"
              onClick={() => setShowForm(false)}
            ></div>
            <div className="modal-content">
              <div className="modal-header">
                <h3>{t("stickyNotes.formTitle")}</h3>
                <button
                  className="close-modal"
                  onClick={() => setShowForm(false)}
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleSubmit} className="note-form">
                <div className="form-group">
                  <label htmlFor="content">
                    {t("stickyNotes.messageLabel")}
                  </label>
                  <textarea
                    id="note"
                    value={newNote.note}
                    onChange={(e) =>
                      setNewNote({ ...newNote, note: e.target.value })
                    }
                    placeholder={t("stickyNotes.messagePlaceholder")}
                    rows={2}
                    maxLength={20}
                    required
                  ></textarea>
                  <div className="character-count">
                    {newNote.note.length}/20
                  </div>
                </div>

                <div className="form-actions">
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={() => setShowForm(false)}
                    disabled={isSubmitting}
                  >
                    {t("stickyNotes.cancel")}
                  </button>
                  <button
                    type="submit"
                    className="submit-btn"
                    disabled={isSubmitting}
                  >
                    {isSubmitting
                      ? t("stickyNotes.submitting")
                      : t("stickyNotes.submit")}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default StickyNoteWall;
