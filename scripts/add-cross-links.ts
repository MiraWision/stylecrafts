#!/usr/bin/env ts-node

/**
 * Script to add ToolCrossLinks component to all tool pages
 * 
 * This script provides the commands and code snippets needed to add
 * cross-links to all tool pages in the application.
 */

import { ALL_TOOLS, TOOL_CATEGORIES } from '../components/ui/cross-links/tool-links';

console.log('🔗 Adding ToolCrossLinks to all tool pages...\n');

console.log('📋 Tool Pages to Update:');
console.log('========================');

// Color tools
console.log('\n🎨 Color Tools:');
Object.entries(ALL_TOOLS)
  .filter(([_, tool]) => tool.category === TOOL_CATEGORIES.COLORS)
  .forEach(([key, tool]) => {
    console.log(`  • ${tool.title} (${key})`);
    console.log(`    Path: ${tool.href}`);
    console.log(`    Add: <ToolCrossLinks toolKey="${key}" title="Explore More Color Tools" />`);
  });

// Image tools
console.log('\n🖼️  Image Tools:');
Object.entries(ALL_TOOLS)
  .filter(([_, tool]) => tool.category === TOOL_CATEGORIES.IMAGES)
  .forEach(([key, tool]) => {
    console.log(`  • ${tool.title} (${key})`);
    console.log(`    Path: ${tool.href}`);
    console.log(`    Add: <ToolCrossLinks toolKey="${key}" title="Explore More Image Tools" />`);
  });

// Generator tools
console.log('\n⚙️  Generator Tools:');
Object.entries(ALL_TOOLS)
  .filter(([_, tool]) => tool.category === TOOL_CATEGORIES.GENERATORS)
  .forEach(([key, tool]) => {
    console.log(`  • ${tool.title} (${key})`);
    console.log(`    Path: ${tool.href}`);
    console.log(`    Add: <ToolCrossLinks toolKey="${key}" title="Explore More Generator Tools" />`);
  });

console.log('\n📝 Implementation Steps:');
console.log('=======================');
console.log('1. Add import: import { ToolCrossLinks } from "@/components/ui/cross-links";');
console.log('2. Add component before closing tag of main container');
console.log('3. Use appropriate toolKey and title');
console.log('4. For dynamic tools (like color converter), pass dynamicData prop');

console.log('\n✨ Example Implementation:');
console.log('==========================');
console.log(`
// Add this import at the top
import { ToolCrossLinks } from '@/components/ui/cross-links';

// Add this before the closing tag of your main container
<ToolCrossLinks
  toolKey="your-tool-key"
  title="Explore More Tools"
  dynamicData={{ /* any dynamic data */ }}
/>
`);

console.log('\n🎯 Benefits:');
console.log('============');
console.log('• Automatic relevant tool suggestions');
console.log('• Random selection for variety');
console.log('• Consistent UI across all tools');
console.log('• Easy maintenance and updates');
console.log('• Better user engagement and discovery');

console.log('\n🚀 Ready to implement! Use the toolKey values above for each page.');
