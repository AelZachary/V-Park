import re
from pathlib import Path

files = [
    Path(r'd:\Abel\UC Makassar\Kelas\Semester 4\Mobile Application Development\V-Park\frontend\components\booking\floors\P3.tsx'),
    Path(r'd:\Abel\UC Makassar\Kelas\Semester 4\Mobile Application Development\V-Park\frontend\components\booking\floors\P4.tsx'),
]

pattern_slot = re.compile(r"slot=(['\"])([^'\"]+)\1")
pattern_status_available1 = re.compile(r"status=\{\s*resolveSlotStatus\(\s*['\"][^'\"]+['\"]\s*,\s*['\"]available['\"]\s*,\s*slotStatuses\s*\)\s*\}")
pattern_status_available2 = re.compile(r"status=\{\s*resolveSlotStatus\(\s*['\"][^'\"]+['\"]\s*,\s*['\"]available['\"]\s*,\s*slotStatuses\s*,\s*selectedSlot\s*\)\s*\}")
pattern_status_available3 = re.compile(r"status=(['\"])available\1")
pattern_onpress1 = re.compile(r"onPress=\{\(\) => onSelectSlot\(\s*['\"][^'\"]+['\"]\s*,\s*resolveSlotStatus\(\s*['\"][^'\"]+['\"]\s*,\s*['\"]available['\"]\s*,\s*slotStatuses\s*\)\s*\)\s*\}")
pattern_onpress2 = re.compile(r"onPress=\{\(\) => onSelectSlot\(\s*['\"][^'\"]+['\"]\s*,\s*['\"]available['\"]\s*\)\s*\}")
pattern_closing = re.compile(r"(\n\s*)(/?>)")

for path in files:
    prefix = path.stem + '-'
    text = path.read_text(encoding='utf-8')
    lines = text.splitlines()
    out_lines = []
    i = 0
    while i < len(lines):
        line = lines[i]
        if '<ParkingSlot' in line:
            block = [line]
            while i < len(lines) and '/>' not in lines[i]:
                i += 1
                block.append(lines[i])
            raw = '\n'.join(block)
            is_available = (
                'status="available"' in raw
                or "status='available'" in raw
                or re.search(r'status=\{\s*resolveSlotStatus\([^)]*"available"', raw)
            )
            if is_available:
                slot_match = pattern_slot.search(raw)
                if slot_match:
                    old_slot = slot_match.group(2)
                    new_slot = prefix + old_slot
                    raw = re.sub(rf"slot=(['\"])" + re.escape(old_slot) + r"\1", f'slot="{new_slot}"', raw)
                    raw = pattern_status_available1.sub(
                        f'status={{resolveSlotStatus("{new_slot}", "available", slotStatuses, selectedSlot)}}',
                        raw,
                    )
                    raw = pattern_status_available2.sub(
                        f'status={{resolveSlotStatus("{new_slot}", "available", slotStatuses, selectedSlot)}}',
                        raw,
                    )
                    raw = pattern_status_available3.sub(
                        f'status={{resolveSlotStatus("{new_slot}", "available", slotStatuses, selectedSlot)}}',
                        raw,
                    )
                    if 'onPress={() => onSelectSlot' in raw:
                        raw = pattern_onpress1.sub(
                            f'onPress={{() => onSelectSlot("{new_slot}", "available")}}',
                            raw,
                        )
                        raw = pattern_onpress2.sub(
                            f'onPress={{() => onSelectSlot("{new_slot}", "available")}}',
                            raw,
                        )
                    else:
                        raw = pattern_closing.sub(
                            fr'\1  onPress={{() => onSelectSlot("{new_slot}", "available")}}\n\1\2',
                            raw,
                        )
            out_lines.extend(raw.splitlines())
        else:
            out_lines.append(line)
        i += 1
    path.write_text('\n'.join(out_lines) + '\n', encoding='utf-8')
    print(f'Updated {path.name}')
