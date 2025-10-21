import { createTheme } from '@mui/material/styles';
import theme from '@/lib/theme';

describe('Theme', () => {
  it('should be a valid Material-UI theme', () => {
    expect(theme).toBeDefined();
    expect(theme.palette).toBeDefined();
    expect(theme.typography).toBeDefined();
    expect(theme.components).toBeDefined();
  });

  it('should have correct color palette', () => {
    expect(theme.palette.mode).toBe('light');
    expect(theme.palette.primary.main).toBe('#1A1A1A');
    expect(theme.palette.primary.light).toBe('#333333');
    expect(theme.palette.primary.dark).toBe('#000000');
    expect(theme.palette.primary.contrastText).toBe('#FFFFFF');
    
    expect(theme.palette.secondary.main).toBe('#78716C');
    expect(theme.palette.secondary.light).toBe('#A8A29E');
    expect(theme.palette.secondary.dark).toBe('#57534E');
    expect(theme.palette.secondary.contrastText).toBe('#FFFFFF');
    
    expect(theme.palette.background.default).toBe('#FAF8F5');
    expect(theme.palette.background.paper).toBe('#FFFFFF');
    
    expect(theme.palette.text.primary).toBe('#1C1917');
    expect(theme.palette.text.secondary).toBe('#78716C');
    
    expect(theme.palette.divider).toBe('rgba(0, 0, 0, 0.06)');
  });

  it('should have correct typography settings', () => {
    expect(theme.typography.fontFamily).toContain('Inter');
    expect(theme.typography.h1.fontWeight).toBe(800);
    expect(theme.typography.h1.letterSpacing).toBe('-0.02em');
    expect(theme.typography.h1.lineHeight).toBe(1.1);
    
    expect(theme.typography.h2.fontWeight).toBe(800);
    expect(theme.typography.h2.letterSpacing).toBe('-0.02em');
    expect(theme.typography.h2.lineHeight).toBe(1.1);
    
    expect(theme.typography.h3.fontWeight).toBe(700);
    expect(theme.typography.h3.letterSpacing).toBe('-0.01em');
    expect(theme.typography.h3.lineHeight).toBe(1.2);
    
    expect(theme.typography.body1.fontWeight).toBe(400);
    expect(theme.typography.body1.letterSpacing).toBe('0em');
    expect(theme.typography.body1.lineHeight).toBe(1.6);
    
    expect(theme.typography.button.fontWeight).toBe(600);
    expect(theme.typography.button.letterSpacing).toBe('0.02em');
    expect(theme.typography.button.textTransform).toBe('none');
  });

  it('should have correct shape settings', () => {
    expect(theme.shape.borderRadius).toBe(12);
  });

  it('should have component overrides', () => {
    expect(theme.components).toBeDefined();
    expect(theme.components.MuiCssBaseline).toBeDefined();
    expect(theme.components.MuiCard).toBeDefined();
    expect(theme.components.MuiButton).toBeDefined();
    expect(theme.components.MuiTextField).toBeDefined();
    expect(theme.components.MuiChip).toBeDefined();
    expect(theme.components.MuiPaper).toBeDefined();
    expect(theme.components.MuiAppBar).toBeDefined();
  });

  it('should have correct CssBaseline overrides', () => {
    const cssBaselineOverrides = theme.components.MuiCssBaseline.styleOverrides;
    expect(cssBaselineOverrides).toBeDefined();
    expect(cssBaselineOverrides.body).toBeDefined();
    expect(cssBaselineOverrides.body.scrollbarWidth).toBe('thin');
    expect(cssBaselineOverrides.body.scrollbarColor).toBe('#9CA3AF #F3F4F6');
  });

  it('should have correct Card overrides', () => {
    const cardOverrides = theme.components.MuiCard.styleOverrides;
    expect(cardOverrides).toBeDefined();
    expect(cardOverrides.root).toBeDefined();
    expect(cardOverrides.root.backgroundColor).toBe('#FFFFFF');
    expect(cardOverrides.root.border).toBe('none');
    expect(cardOverrides.root.borderRadius).toBe('16px');
  });

  it('should have correct Button overrides', () => {
    const buttonOverrides = theme.components.MuiButton.styleOverrides;
    expect(buttonOverrides).toBeDefined();
    expect(buttonOverrides.root).toBeDefined();
    expect(buttonOverrides.root.borderRadius).toBe('12px');
    expect(buttonOverrides.root.padding).toBe('12px 28px');
    expect(buttonOverrides.root.fontSize).toBe('0.9rem');
    expect(buttonOverrides.root.fontWeight).toBe(600);
    expect(buttonOverrides.root.textTransform).toBe('none');
    
    expect(buttonOverrides.contained).toBeDefined();
    expect(buttonOverrides.contained.background).toBe('#1A1A1A');
    expect(buttonOverrides.contained.color).toBe('#FFFFFF');
    
    expect(buttonOverrides.outlined).toBeDefined();
    expect(buttonOverrides.outlined.borderColor).toBe('rgba(0, 0, 0, 0.15)');
    expect(buttonOverrides.outlined.color).toBe('#1A1A1A');
  });

  it('should have correct TextField overrides', () => {
    const textFieldOverrides = theme.components.MuiTextField.styleOverrides;
    expect(textFieldOverrides).toBeDefined();
    expect(textFieldOverrides.root).toBeDefined();
  });

  it('should have correct Chip overrides', () => {
    const chipOverrides = theme.components.MuiChip.styleOverrides;
    expect(chipOverrides).toBeDefined();
    expect(chipOverrides.root).toBeDefined();
    expect(chipOverrides.root.backgroundColor).toBe('rgba(0, 0, 0, 0.06)');
    expect(chipOverrides.root.border).toBe('none');
    expect(chipOverrides.root.borderRadius).toBe('8px');
    expect(chipOverrides.root.color).toBe('#1C1917');
    
    expect(chipOverrides.colorPrimary).toBeDefined();
    expect(chipOverrides.colorPrimary.backgroundColor).toBe('#1A1A1A');
    expect(chipOverrides.colorPrimary.color).toBe('#FFFFFF');
  });

  it('should have correct Paper overrides', () => {
    const paperOverrides = theme.components.MuiPaper.styleOverrides;
    expect(paperOverrides).toBeDefined();
    expect(paperOverrides.root).toBeDefined();
    expect(paperOverrides.root.backgroundColor).toBe('#FFFFFF');
    expect(paperOverrides.root.borderRadius).toBe('16px');
  });

  it('should have correct AppBar overrides', () => {
    const appBarOverrides = theme.components.MuiAppBar.styleOverrides;
    expect(appBarOverrides).toBeDefined();
    expect(appBarOverrides.root).toBeDefined();
    expect(appBarOverrides.root.backgroundColor).toBe('rgba(255, 255, 255, 0.95)');
    expect(appBarOverrides.root.backdropFilter).toBe('blur(20px)');
  });

  it('should create a valid theme instance', () => {
    const testTheme = createTheme(theme);
    expect(testTheme).toBeDefined();
    expect(testTheme.palette).toBeDefined();
    expect(testTheme.typography).toBeDefined();
    expect(testTheme.components).toBeDefined();
  });

  it('should have consistent color scheme', () => {
    // Primary colors should be dark for text and accents
    expect(theme.palette.primary.main).toBe('#1A1A1A');
    expect(theme.palette.text.primary).toBe('#1C1917');
    
    // Background should be light
    expect(theme.palette.background.default).toBe('#FAF8F5');
    expect(theme.palette.background.paper).toBe('#FFFFFF');
    
    // Secondary text should be muted
    expect(theme.palette.text.secondary).toBe('#78716C');
    expect(theme.palette.secondary.main).toBe('#78716C');
  });

  it('should have proper contrast ratios', () => {
    // Primary text on background should have good contrast
    expect(theme.palette.text.primary).toBe('#1C1917'); // Dark text
    expect(theme.palette.background.default).toBe('#FAF8F5'); // Light background
    
    // Primary button should have good contrast
    expect(theme.palette.primary.main).toBe('#1A1A1A'); // Dark background
    expect(theme.palette.primary.contrastText).toBe('#FFFFFF'); // White text
  });

  it('should have consistent spacing and sizing', () => {
    expect(theme.shape.borderRadius).toBe(12); // Consistent border radius
    
    // Button padding should be consistent
    expect(theme.components.MuiButton.styleOverrides.root.padding).toBe('12px 28px');
    
    // Typography should have consistent line heights
    expect(theme.typography.h1.lineHeight).toBe(1.1);
    expect(theme.typography.h2.lineHeight).toBe(1.1);
    expect(theme.typography.h3.lineHeight).toBe(1.2);
    expect(theme.typography.h4.lineHeight).toBe(1.2);
  });
});
