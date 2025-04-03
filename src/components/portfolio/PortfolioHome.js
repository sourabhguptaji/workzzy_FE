import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Plus, GripVertical, Trash, Airplay, Youtube, Instagram } from "lucide-react";
import { Rnd } from "react-rnd";
import { motion } from "framer-motion";

const initialBlocks = [
  { id: 1, type: "text", category: "intro", content: "", width: 300, height: 200, x: 0, y: 0 },
  { id: 2, type: "image", category: "projects", content: "", width: 300, height: 300, x: 320, y: 0 },
];

export default function BentoPortfolio() {
  const [blocks, setBlocks] = useState(initialBlocks);

  const moveBlock = (id, x, y) => {
    setBlocks((prevBlocks) =>
      prevBlocks.map((block) => (block.id === id ? { ...block, x, y } : block))
    );
  };

  const resizeBlock = (id, width, height) => {
    setBlocks((prevBlocks) =>
      prevBlocks.map((block) => (block.id === id ? { ...block, width, height } : block))
    );
  };

  const addBlock = (type, category) => {
    const newBlock = {
      id: blocks.length + 1,
      type,
      category,
      content: "",
      width: 300,
      height: 200,
      x: 0,
      y: blocks.length * 220,
    };
    setBlocks([...blocks, newBlock]);
  };

  const removeBlock = (id) => {
    setBlocks(blocks.filter((block) => block.id !== id));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{ display: "flex", minHeight: "100vh", width: "100%", background: "#0D1117", color: "white", padding: "24px" }}
      >
        <div style={{ flex: "1", padding: "20px", background: "#161B22", color: "white", }}>
          <img src="https://i.pinimg.com/736x/bd/af/bf/bdafbf81a88e8872b457dd2779840931.jpg" alt="Profile" style={{ width: "150px", height: "150px", borderRadius: "50%", marginBottom: "20px" }} />
          <h2 style={{color: 'white'}} >John Doe</h2>
          <p>Web Developer</p>
        </div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{ flex: "2", position: "relative", padding: "20px", background: "#161B22" }}
        >
          {blocks.map((block) => (
            <DraggableResizableBlock key={block.id} block={block} moveBlock={moveBlock} resizeBlock={resizeBlock} removeBlock={removeBlock} />
          ))}
        </motion.div>

        <div style={{ position: "absolute", bottom: "20px", right: "20px", display: "flex", gap: "10px" }}>
          <button onClick={() => addBlock("text", "intro")} style={{ backgroundColor: "#3182CE" }}>Text</button>
          <button onClick={() => addBlock("image", "projects")} style={{ backgroundColor: "#38A169" }}>Image</button>
          <button onClick={() => addBlock("spotify", "music")} style={{ backgroundColor: "#1DB954" }}><Airplay size={20} /></button>
          <button onClick={() => addBlock("youtube", "videos")} style={{ backgroundColor: "#FF0000" }}><Youtube size={20} /></button>
          <button onClick={() => addBlock("instagram", "social")} style={{ backgroundColor: "#C13584" }}><Instagram size={20} /></button>
        </div>
      </motion.div>
    </DndProvider>
  );
}

function DraggableResizableBlock({ block, moveBlock, resizeBlock, removeBlock }) {
  return (
    <Rnd
      size={{ width: block.width, height: block.height }}
      position={{ x: block.x, y: block.y }}
      onDragStop={(e, d) => moveBlock(block.id, d.x, d.y)}
      onResizeStop={(e, direction, ref, delta, position) => {
        resizeBlock(block.id, ref.offsetWidth, ref.offsetHeight);
        moveBlock(block.id, position.x, position.y);
      }}
      style={{ position: "absolute", padding: "24px", borderRadius: "16px", backgroundColor: "#21262D", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}
    >
      {block.content === "" ? (
        <button style={{ background: "#444", color: "white", padding: "10px", borderRadius: "8px" }}>Add Content</button>
      ) : block.type === "text" ? (
        <p>{block.content}</p>
      ) : block.type === "image" ? (
        <img src={block.content} alt="Portfolio" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      ) : (
        <iframe src={block.content} width="100%" height="100%" frameBorder="0" allowFullScreen></iframe>
      )}
      <div style={{ position: "absolute", top: "12px", right: "12px", display: "flex", gap: "8px" }}>
        <GripVertical style={{ cursor: "grab" }} />
        <Trash style={{ cursor: "pointer", color: "#E53E3E" }} onClick={() => removeBlock(block.id)} />
      </div>
    </Rnd>
  );
}