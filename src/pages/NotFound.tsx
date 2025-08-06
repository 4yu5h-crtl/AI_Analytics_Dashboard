import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion, easeOut, easeInOut } from "framer-motion";
import { Home, ArrowLeft, Search, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const NotFound = () => {
  const location = useLocation();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: prefersReducedMotion ? 0.1 : 0.6,
        ease: easeOut,
        staggerChildren: prefersReducedMotion ? 0 : 0.1,
        delayChildren: prefersReducedMotion ? 0 : 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: prefersReducedMotion ? 0 : 30,
      scale: prefersReducedMotion ? 1 : 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: prefersReducedMotion ? 0.1 : 0.5,
        ease: easeOut
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: easeInOut
      }
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
      
      {/* Floating elements for visual interest */}
      <motion.div
        className="absolute top-20 left-20 w-32 h-32 bg-primary/10 rounded-full blur-xl"
        variants={floatingVariants}
        animate="animate"
      />
      <motion.div
        className="absolute bottom-20 right-20 w-24 h-24 bg-secondary/10 rounded-full blur-xl"
        variants={floatingVariants}
        animate="animate"
        transition={{ delay: 1 }}
      />
      <motion.div
        className="absolute top-1/2 left-1/4 w-16 h-16 bg-accent/10 rounded-full blur-lg"
        variants={floatingVariants}
        animate="animate"
        transition={{ delay: 2 }}
      />

      <motion.div
        className="relative z-10 max-w-2xl mx-auto text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Main 404 Card */}
        <motion.div
          className="glass-card p-12 rounded-2xl shadow-2xl border border-border/50"
          variants={itemVariants}
        >
          {/* 404 Icon */}
          <motion.div
            className="flex justify-center mb-8"
            variants={itemVariants}
          >
            <div className="relative">
              <motion.div
                className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <AlertTriangle className="w-12 h-12 text-white" />
              </motion.div>
              <motion.div
                className="absolute -top-2 -right-2 w-8 h-8 bg-destructive rounded-full flex items-center justify-center text-white text-sm font-bold"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
              >
                4
              </motion.div>
            </div>
          </motion.div>

          {/* 404 Text */}
          <motion.h1
            className="text-8xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4"
            variants={itemVariants}
          >
            404
          </motion.h1>

          {/* Error Message */}
          <motion.h2
            className="text-3xl font-semibold text-foreground mb-4"
            variants={itemVariants}
          >
            Page Not Found
          </motion.h2>

          <motion.p
            className="text-lg text-muted-foreground mb-8 leading-relaxed"
            variants={itemVariants}
          >
            Oops! The page you're looking for doesn't exist. It might have been moved, 
            deleted, or you entered the wrong URL.
          </motion.p>

          {/* Current Path Display */}
          <motion.div
            className="bg-muted/50 rounded-lg p-4 mb-8 text-sm font-mono text-muted-foreground"
            variants={itemVariants}
          >
            <span className="text-foreground font-medium">Attempted URL:</span> {location.pathname}
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            variants={itemVariants}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button asChild size="lg" className="gap-2">
                <Link to="/">
                  <Home className="w-4 h-4" />
                  Return to Dashboard
                </Link>
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" size="lg" className="gap-2" onClick={() => window.history.back()}>
                <ArrowLeft className="w-4 h-4" />
                Go Back
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Additional Help Section */}
        <motion.div
          className="mt-8 glass-card p-6 rounded-xl border border-border/30"
          variants={itemVariants}
        >
          <motion.div
            className="flex items-center justify-center gap-2 mb-3"
            variants={itemVariants}
          >
            <Search className="w-5 h-5 text-muted-foreground" />
            <h3 className="text-lg font-medium text-foreground">Need Help?</h3>
          </motion.div>
          
          <motion.p
            className="text-sm text-muted-foreground"
            variants={itemVariants}
          >
            Try navigating to one of these pages:
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-2 mt-4 justify-center"
            variants={itemVariants}
          >
            {[
              { name: "Dashboard", path: "/" },
              { name: "Analytics", path: "/analytics" },
              { name: "Revenue", path: "/revenue" },
              { name: "Campaigns", path: "/campaigns" }
            ].map((page, index) => (
              <motion.div
                key={page.path}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
              >
                <Button asChild variant="ghost" size="sm">
                  <Link to={page.path}>
                    {page.name}
                  </Link>
                </Button>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Footer */}
        <motion.div
          className="mt-8 text-center"
          variants={itemVariants}
        >
          <p className="text-sm text-muted-foreground">
            ADmyBRAND Insights Dashboard
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;
