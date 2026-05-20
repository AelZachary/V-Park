const fs = require('fs');
const path = require('path');

const files = [
  path.join(__dirname, 'components', 'booking', 'floors', 'P3.tsx'),
  path.join(__dirname, 'components', 'booking', 'floors', 'P4.tsx'),
];

for (const filePath of files) {
  const text = fs.readFileSync(filePath, 'utf8');
  const lines = text.split(/\r?\n/);
  const out = [];
  let i = 0;

  while (i < lines.length) {
    let line = lines[i];
    if (line.includes('<ParkingSlot')) {
      const block = [line];
      while (i < lines.length && !lines[i].includes('/>')) {
        i += 1;
        block.push(lines[i]);
      }
      let raw = block.join('\n');
      const isAvailable =
        raw.includes('status="available"') ||
        raw.includes("status='available'") ||
        /status=\{\s*resolveSlotStatus\([^)]*['"]available['"]/.test(raw);

      if (isAvailable) {
        const slotMatch = raw.match(/slot=(['"])([^'"]+)\1/);
        if (slotMatch) {
          const oldSlot = slotMatch[2];
          const prefix = path.basename(filePath, '.tsx');
            const newSlot = oldSlot.startsWith(`${prefix}-`) ? oldSlot : `${prefix}-${oldSlot}`;
          raw = raw.replace(
            /status=\{\s*resolveSlotStatus\(\s*['"][^'"]+['"]\s*,\s*['"]available['"]\s*,\s*slotStatuses\s*\)\s*\}/g,
            `status={resolveSlotStatus("${newSlot}", "available", slotStatuses, selectedSlot)}`
          );
          raw = raw.replace(
            /status=\{\s*resolveSlotStatus\(\s*['"][^'"]+['"]\s*,\s*['"]available['"]\s*,\s*slotStatuses\s*,\s*selectedSlot\s*\)\s*\}/g,
            `status={resolveSlotStatus("${newSlot}", "available", slotStatuses, selectedSlot)}`
          );
          raw = raw.replace(
            /status=(['"])available\1/g,
            `status={resolveSlotStatus("${newSlot}", "available", slotStatuses, selectedSlot)}`
          );

          if (raw.includes('onPress={() => onSelectSlot')) {
            raw = raw.replace(
              /onPress=\{\(\) => onSelectSlot\(\s*['"][^'"]+['"]\s*,\s*resolveSlotStatus\(\s*['"][^'"]+['"]\s*,\s*['"]available['"]\s*,\s*slotStatuses\s*\)\s*\)\s*\}/g,
              `onPress={() => onSelectSlot("${newSlot}", "available")}`
            );
            raw = raw.replace(
              /onPress=\{\(\) => onSelectSlot\(\s*['"][^'"]+['"]\s*,\s*['"]available['"]\s*\)\s*\}/g,
              `onPress={() => onSelectSlot("${newSlot}", "available")}`
            );
          } else {
            raw = raw.replace(
              /(\s*)(\/?>)$/,
              ` onPress={() => onSelectSlot("${newSlot}", "available")}$1$2`
            );
          }
        }
      }

      out.push(...raw.split('\n'));
    } else {
      out.push(line);
    }
    i += 1;
  }

  fs.writeFileSync(filePath, out.join('\n') + '\n', 'utf8');
  console.log(`Updated ${path.basename(filePath)}`);
}
