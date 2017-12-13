package net.savantly.sprout.module;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import net.savantly.sprout.core.module.SproutModuleConfiguration;

@Aspect
@Component
public class SproutModuleAspect {
	
	private static final Logger log = LoggerFactory.getLogger(SproutModuleAspect.class);
	
    @Pointcut("@annotation(annotation)")
    public void pointCut(SproutModuleConfiguration annotation) throws Throwable {
        log.info("xxxxxxxxxxxxx: SproutModuleAspect.pointCut() called with '" + annotation.value() + "'");
    }

    @Around("@annotation(annotation)")
    public Object advice(ProceedingJoinPoint joinPoint, SproutModuleConfiguration annotation) throws Throwable {
        log.info("xxxxxxxxxxxxx: SproutModuleAspect.advice() called with '" + annotation.value() + "'");
        return joinPoint.proceed();
    }
}
